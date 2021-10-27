import * as fs from 'fs'
import * as path from 'path'

import { JSDOM as JSDom } from 'jsdom'
import * as yaml from 'js-yaml'

import { Course } from '@mathigon/studio/server/interfaces'
import { CONTENT, OUTPUT, loadYAML, writeFile } from '@mathigon/studio/build/utilities'
import { parseYAML} from '@mathigon/studio/build/markdown'
import {decode} from 'html-entities'

// TODO: as an improvement we can try to declare a ts module to use import instead of require
const mathjax = require('mathjax')

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

const cleanEquation = function(text) {
  return text.replace(/(^|[^\\])\$([^{][^$]*?)\$($|[^\w])/g, (_, prefix, body, suffix) => {
      return prefix + decode(body) + suffix;
    }).replace(/\\/g, '')
}

const getCodeId = function(code) {
  return `${decode(code)}truehtml`
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

const findIndexFromCourse = function(courseId: string) {
  const indexCourse = loadYAML(`${workingContentPath}/${courseId}/index.yaml`)
  // TODO: this can be improved adding lodash to check it with isEmpty
  if (Object.entries(indexCourse).length === 0) return undefined
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
    // TODO: improve this logic
    section.subsections = section.subsections.map(subsection => parseSection(subsection, store))
  }

  const code = findEquationFromTitle(section.title)
  if(!code) return section

  const codeCleaned = cleanEquation(code[0])
  const codeId = getCodeId(codeCleaned)
  if (store[codeId]) {
    section.title = replaceEquationByMathjax(section.title, store[codeId])
  }
  return section
}

const updateIndexYaml = async function() {
  // Get Mathjax cache from Mathigon build
  const cacheFile = path.join(process.env.HOME, '/.mathjax-cache')
  if(!fs.existsSync(cacheFile)) {
    return
  }
  const mathJaxStore = JSON.parse(fs.readFileSync(cacheFile, 'utf8'))

  const indexCourses = COURSES.map(courseId => findIndexFromCourse(courseId))
  const indexCoursesParsed = indexCourses.map(index => {
    if(!index) return undefined

    const newIndex = {}
    const moduleIds = Object.keys(index)
    const modules = moduleIds.map(moduleId => index[moduleId])
    const modulesParsed = modules.map(module => 
      module.map(section => parseSection(section, mathJaxStore)))
    moduleIds.map((moduleId, index) => newIndex[moduleId] = modulesParsed[index])
    return newIndex
  })
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

translationsLanguages.forEach(async(language) => {
  updateSharedYaml(language)
})

updateIndexYaml()

generateJsonSitemap(
  path.join(__dirname, '../public/sitemap.xml'),
  path.join(__dirname, '../public/sitemap.json')
)
