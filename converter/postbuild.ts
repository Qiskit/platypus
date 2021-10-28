import * as fs from 'fs'
import * as path from 'path'

import { JSDOM as JSDom } from 'jsdom'
import * as yaml from 'js-yaml'

import { Course } from '@mathigon/studio/server/interfaces'
import { CONTENT, OUTPUT, loadYAML, writeFile } from '@mathigon/studio/build/utilities'
import { parseYAML } from '@mathigon/studio/build/markdown'
import { decode } from 'html-entities'

import {
  translationsLanguages,
  workingContentPath,
  workingTranslationsPath
} from './common'
import generateJsonSitemap from './sitemap-to-json'

const COURSES = fs.readdirSync(CONTENT)
  .filter(id => id !== 'shared' && !id.includes('.') && !id.startsWith('_'))

const loadJSON = function (file: string) {
  if (!fs.existsSync(file)) return undefined
  return JSON.parse(fs.readFileSync(file, 'utf8')) as unknown
}

const getIndexPath = function(courseId) {
  return `${workingContentPath}/${courseId}/index.yaml`
}

const getSharedPath = function (language: string = 'en') {
  return language == 'en'
    ? path.join(workingContentPath, 'shared')
    : path.join(workingTranslationsPath, language, 'shared')
}

const findCourse = function (courseId: string, locale: string = 'en'): Course {
  const course = loadJSON(OUTPUT + `/content/${courseId}/data_${locale}.json`) as Course
  if (!course) return undefined;
  return course
}

const findEquationFromTitle = function(title) {
  return title.match(/\$(.*?)\$/g)
}

const replaceEquationByMathjax = function(title, mathjaxEquation) {
  return title.replace(/\$(.*?)\$/g, mathjaxEquation)
}

const findIndexFromCourse = function(path) {
  const indexCourse = loadYAML(path)
  if (Object.entries(indexCourse).length === 0) {
    return undefined
  }
  return indexCourse
}

const insertSections = (content: object, document: HTMLDocument, includeHtml: boolean): object => {
  Object.keys(content).forEach((key) => {
    const valueObj = content[key]
    let sectionIds = new Set()
    let node: any = document.getElementById(key)

    if (node) {
      // search by id attribute
      sectionIds.add(node.closest('q-section').getAttribute('data-id'))
      node.removeAttribute('id')
    } else {
      // search by (x-gloss) xid attribute
      let nodes = document.querySelectorAll(`x-gloss[xid="${key}"]`)
      if (nodes.length) {
        node = nodes[0]
        nodes.forEach(n => {
          sectionIds.add(n.closest('q-section').getAttribute('data-id'))
        })
      } else {
        // search by class attribute
        nodes = document.querySelectorAll(`mjx-container .${key}`)
        node = nodes.length ? nodes[0] : null
        nodes.forEach(n => {
          sectionIds.add(n.closest('q-section').getAttribute('data-id'))
        });
      }
    }
    
    if (includeHtml) {
      valueObj.html = node ? node.outerHTML : ''
    }
    valueObj.sections = []

    if (sectionIds.size) {
      try {
        sectionIds.forEach(sectionId => {
          if (sectionId) {
            valueObj.sections.push(sectionId)
          }
        })
      } catch (e) {
        console.warn(e)
      }
    }
  })

  return content
}

const parseSection = function(section, store) {
  if(section.subsections?.length) {
    section.subsections = section.subsections.map(subsection => parseSection(subsection, store))
  }

  const code = findEquationFromTitle(section.title)
  if(!code) {
    return section
  }

  const codeCleaned = parseParagraph(code[0])
  const codeId = getId(codeCleaned)
  if (store[codeId]) {
    section.title = replaceEquationByMathjax(section.title, store[codeId])
  }
  return section
}

const updateIndexYaml = async function() {
  // Get Mathjax cache from Mathigon build
  const cacheFile = path.join(process.env.HOME, '/.mathjax-cache')
  if(!fs.existsSync(cacheFile)) {
    return undefined
  }
  const mathJaxStore = JSON.parse(fs.readFileSync(cacheFile, 'utf8'))

  const indexCoursePaths = COURSES.map(courseId => getIndexPath(courseId))
  const indexCourses = indexCoursePaths.map(indexCoursePath => findIndexFromCourse(indexCoursePath))
  const indexCoursesParsed = indexCourses.map(index => {
    if(!index) {
      return undefined
    }

    const newIndex = {}
    const moduleIds = Object.keys(index)
    const modules = moduleIds.map(moduleId => index[moduleId])
    const modulesParsed = modules.map(module => 
      module.map(section => parseSection(section, mathJaxStore)))
    moduleIds.map((moduleId, index) => newIndex[moduleId] = modulesParsed[index])
    return newIndex
  })
  
  for(let indexCoursePath of indexCoursePaths) {
    const indexCourse = indexCoursesParsed[indexCoursePaths.indexOf(indexCoursePath)]
    if(indexCourse) {
      await writeFile(indexCoursePath, yaml.dump(indexCourse, {sortKeys: true}))
    }
  }
}

const updateSharedYaml = async function(language: string = 'en') {
  let courseHtml = ''
  COURSES.forEach(courseId => {
    const course = findCourse(courseId, language)
    if (course) {
      Object.keys(course.steps).forEach(stepId => {
        const section = course?.sections.find(s => s.steps.indexOf(stepId) > -1)
        // insert a section id for easier retrieval later
        courseHtml += `<q-section data-id="${section.id}">${course.steps[stepId].html}</q-section>`
      })
    }
  })

  const document = new JSDom(`<!DOCTYPE html><body>${courseHtml}</body>`).window.document
  const sharedPath = getSharedPath(language)

  // update notations.yaml with section IDs and html fragment
  console.log(`updating notations yaml [${language}]`)
  const notationsYaml = path.join(sharedPath, 'notations.yaml')
  const notations = insertSections((loadYAML(notationsYaml) || {}) as object, document, true)
  await writeFile(notationsYaml, yaml.dump(notations, {sortKeys: true}))

  // update glossary.yaml with section IDs
  console.log(`updating glossary yaml [${language}]`)
  const glossaryYaml = path.join(sharedPath, 'glossary.yaml')
  const glossary = insertSections((loadYAML(glossaryYaml) || {}) as object, document, false)
  await writeFile(glossaryYaml, yaml.dump(glossary, {sortKeys: true}))

  // update universal notations
  console.log(`updating universal-notations yaml [${language}]`)
  const universal = await parseYAML(sharedPath, 'universal-notations.yaml', language, 'notation')
  const startIndex = '<p>'.length
  const endIndex = '</p>'.length

  for (let notes in universal) {
    let n = universal[notes].notation
    if (n.startsWith('<p>')) {
      n = n.substring(startIndex)
    }
    if (n.endsWith('</p>')) {
      n = n.substring(0, n.length - endIndex)
    }
    universal[notes].notation = n
  }

  const universalYaml = path.join(sharedPath, 'universal.yaml')
  await writeFile(universalYaml, yaml.dump(universal, {sortKeys: true}))
}


/** Mathigon methods from mathjax.js */

/** This method differs from the original one in two things:
 * 1.- to simplify the logic the key always finishes with truehtml
 * 2.- there is a replace that removes \; by ;
*/
const getId = function(code) {
  return `${decode(code)}truehtml`.replace(/\\;/g, ';')
}

/** Mathigon methods from renderer.js */

/** This method differs from the original to avoid the mathigon widgets and GitHub Emoji replaces */
const parseParagraph = function(text) {
  text = inlineEquations(text);

  // Replace non-breaking space and escaped $s.
  return text.replace(/\\ /g, '&nbsp;').replace(/\\\$/g, '$');
}

/** Render inline LaTeX equations using $x^2$. */
function inlineEquations(text) {
  // We want to match $a$ strings, except
  //  * the closing $ is immediately followed by a word character (e.g. currencies)
  //  * the opening $ is prefixed with a \ (for custom override)
  //  * they start with ${} (for variables)
  return text.replace(/(^|[^\\])\$([^{][^$]*?)\$($|[^\w])/g, (_, prefix, body, suffix) => {
    return prefix + decode(body) + suffix;
  });
}

translationsLanguages.forEach(async(language) => {
  updateSharedYaml(language)
})

updateIndexYaml()

generateJsonSitemap(
  path.join(__dirname, '../public/sitemap.xml'),
  path.join(__dirname, '../public/sitemap.json')
)
