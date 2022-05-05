import * as path from 'path'
import * as fs from 'fs'

import { AVAILABLE_LOCALES } from '@mathigon/studio/server/utilities/i18n'
import { Course, Section } from '@mathigon/studio/server/interfaces'
import {
  CONFIG as mConfig,
  CONTENT_DIR,
  getCourse,
  loadYAML,
  loadCombinedYAML
} from '@mathigon/studio/server/utilities/utilities'

import {
  Analytics,
  AnalyticsEntry,
  AnalyticsConfig,
  NotationsMap,
  NotationsLocales,
  Subsection,
  TocCourse
} from './interfaces'

import { IS_PRODUCTION } from './configuration'

const TEXTBOOK_HOME = 'https://qiskit.org/textbook-beta'

const DEFAULT_SHARED_FOLDER = path.join(CONTENT_DIR, 'shared')

const CONFIG: AnalyticsConfig = <AnalyticsConfig>mConfig

const analytics: AnalyticsEntry = IS_PRODUCTION
  ? (<Analytics>CONFIG.analytics).production
  : (<Analytics>CONFIG.analytics).development

CONFIG.analytics = analytics

const TOC: [TocCourse] = (loadYAML(path.join(DEFAULT_SHARED_FOLDER, 'toc.yaml')) || []) as [TocCourse]

TOC.forEach((course: TocCourse) => {
  course.id = course.url.startsWith('/') ? course.url.substring(1) : course.url
  course.sections.forEach((section) => {
    section.pageUrl = `/course/${course.id}/${section.id}`
  })
})

const sectionIndexes: {[l: string]: {[x: string]: Subsection[]}} = {}

// const COURSES = fs.readdirSync(CONTENT_DIR)
//   .filter(id => id !== 'shared' && !id.includes('.') && !id.startsWith('_'))
const learningPaths:string[] = []
const textbookCourses:string[] = []
const miscCourses:string[] = []
TOC.forEach((t: TocCourse) => {
  const url = t.url.startsWith('/') ? t.url.substring(1) : t.url
  if (t.type === 'learning-path') {
    learningPaths.push(url)
  } else if (t.type === 'docs') {
    miscCourses.push(url)
  } else {
    textbookCourses.push(url)
  }
})

const tocFilterByType = function (type: string = '') {
  if (type === '') {
    return TOC
  }
  return TOC.filter(course => course.type === type)
}

const COURSES = {
  uncategorized: textbookCourses,
  learningPaths,
  docs: miscCourses
}

const resolvePath = (directory: string, file: string, locale = 'en') => {
  if (locale === 'en') { return path.join(directory, file) }
  const courseId = path.basename(directory)
  return path.join(directory, '../../translations', locale, courseId, file)
}

const NOTATIONS: NotationsLocales = {}
const GLOSSARY: {[x: string]: any} = {}
const UNIVERSAL_NOTATIONS: {[x: string]: Array<any>} = {}

CONFIG.locales.forEach((language) => {
  NOTATIONS[language] = (loadYAML(resolvePath(DEFAULT_SHARED_FOLDER, 'notations.yaml', language)) || {}) as NotationsMap
  GLOSSARY[language] = (loadYAML(resolvePath(DEFAULT_SHARED_FOLDER, 'glossary.yaml')) || {}) as object
  UNIVERSAL_NOTATIONS[language] = Object.values((loadYAML(resolvePath(DEFAULT_SHARED_FOLDER, 'universal.yaml')) || {}) as object)
})

const updateGlossary = function (course: Course): string {
  let glossJson = course.glossJSON
  if (glossJson) {
    const glossary = JSON.parse(glossJson)
    const languageGloss = GLOSSARY[course.locale || 'en']
    Object.keys(languageGloss).forEach((key: string) => {
      if (glossary[key]) {
        glossary[key].sections = languageGloss[key].sections
      }
    })
    glossJson = JSON.stringify(glossary)
  }
  return glossJson
}

const isLearningPath = function (course: Course) {
  const c = TOC.find((t: { url: string; }) => {
    return t.url === `/${course.id}`
  })
  return c ? c.type === 'learning-path' : false
}

const findPrevSection = function (course: Course, section: Section) {
  const prevSection = course.sections[course.sections.indexOf(section) - 1]
  if (prevSection) { return { section: prevSection } }
}

const findNextSection = function (course: Course, section: Section) {
  const nextSection = course.sections[course.sections.indexOf(section) + 1]
  if (nextSection) {
    return { section: nextSection }
  } else if (!isLearningPath(course)) {
    const nextCourse = getCourse(course.nextCourse, course.locale)!
    if (nextCourse) { return { course: nextCourse, section: nextCourse.sections[0] } }
  }
}

const getSectionIndex = function (course: Course, section: Section) {
  const sectionId = `${course.id}/${section.id}`
  const loc = course.locale || 'en'
  if (!sectionIndexes[loc] || !sectionIndexes[loc][sectionId]) {
    const courseIndex = (
      loadYAML(resolvePath(`${CONTENT_DIR}/${course.id}`, 'index.yaml', course.locale)) || []
    ) as {[x: string]: Subsection[]}
    if (!sectionIndexes[loc]) {
      sectionIndexes[loc] = {}
    }
    sectionIndexes[loc][sectionId] = courseIndex[section.id]
  }
  return sectionIndexes[loc][sectionId] || []
}

const TRANSLATIONS: Record<string, Record<string, string>> = {}
for (const locale of AVAILABLE_LOCALES) {
  if (locale.id === 'en') { continue }
  TRANSLATIONS[locale.id] = loadCombinedYAML(`translations/${locale.id}/strings.yaml`) as Record<string, string>
}

const loadLocaleRawFile = function (path: string, locale: string): string {
  const fullPath = process.cwd() + `/translations/${locale}/${path}`
  let content = ''
  if (fs.existsSync(fullPath)) {
    content = fs.readFileSync(fullPath, 'utf-8')
  } else {
    const defaultPath = process.cwd() + `/translations/${path}`
    if (fs.existsSync(defaultPath)) {
      content = fs.readFileSync(defaultPath, 'utf-8')
    }
  }
  return content
}

export {
  CONFIG,
  COURSES,
  NOTATIONS,
  GLOSSARY,
  TEXTBOOK_HOME,
  TRANSLATIONS,
  UNIVERSAL_NOTATIONS,
  TOC,
  findNextSection,
  findPrevSection,
  getSectionIndex,
  isLearningPath,
  updateGlossary,
  loadLocaleRawFile,
  tocFilterByType
}
