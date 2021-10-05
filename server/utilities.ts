import * as path from 'path'
import * as fs from 'fs'

import { AVAILABLE_LOCALES } from '@mathigon/studio/server/i18n'
import { Course, Section } from '@mathigon/studio/server/interfaces'
import {
  CONFIG as mConfig,
  CONTENT_DIR,
  PROJECT_DIR,
  getCourse,
  loadYAML,
  loadCombinedYAML
} from '@mathigon/studio/server/utilities'

import {
  Analytics,
  AnalyticsEntry,
  AnalyticsConfig,
  NotationsMap,
  NotationsLocales,
  Subsection,
  TocCourse
} from './interfaces'

const TEXTBOOK_HOME = 'https://qiskit.org/textbook-beta'

const CONFIG: AnalyticsConfig = <AnalyticsConfig>mConfig

const analytics: AnalyticsEntry = process.env.NODE_ENV === 'production'
  ? (<Analytics>CONFIG.analytics).production
  : (<Analytics>CONFIG.analytics).development

CONFIG.analytics = analytics

const toc: [TocCourse] = (loadYAML(path.join(PROJECT_DIR, 'notebooks/toc.yaml')) || []) as [TocCourse]

const sectionIndexes: {[l: string]: {[x: string]: Subsection[]}} = {}

// const COURSES = fs.readdirSync(CONTENT_DIR)
//   .filter(id => id !== 'shared' && !id.includes('.') && !id.startsWith('_'))
const learningPaths:string[] = []
const textbookCourses:string[] = []
const miscCourses:string[] = []
toc.forEach((t: TocCourse) => {
  const url = t.url.startsWith('/') ? t.url.substring(1) : t.url
  if (t.type === 'learning-path') {
    learningPaths.push(url)
  } else if (t.type === 'docs') {
    miscCourses.push(url)
  } else {
    textbookCourses.push(url)
  }
})
const COURSES = {
  uncategorized: textbookCourses,
  learningPaths: learningPaths,
  docs: miscCourses
}

const resolvePath = (directory: string, file: string, locale = 'en') => {
  if (locale === 'en') return path.join(directory, file);
  const courseId = path.basename(directory);
  return path.join(directory, '../../translations', locale, courseId, file);
}

const NOTATIONS: NotationsLocales = {}
const GLOSSARY: {[x: string]: any} = {}
const UNIVERSAL_NOTATIONS: {[x: string]: Array<any>} = {}

CONFIG.locales.forEach(language => {
  const defaultShared = path.join(CONTENT_DIR, 'shared')
  NOTATIONS[language] = (loadYAML(resolvePath(defaultShared, 'notations.yaml', language)) || {}) as NotationsMap
  GLOSSARY[language] = (loadYAML(resolvePath(defaultShared, 'glossary.yaml')) || {}) as object
  UNIVERSAL_NOTATIONS[language] = Object.values((loadYAML(resolvePath(defaultShared, 'universal.yaml')) || {}) as object)
})

const updateGlossary = function(course: Course): string {
  let glossJson = course.glossJSON
  if (glossJson) {
    const glossary = JSON.parse(glossJson)
    const languageGloss = GLOSSARY[course.locale || 'en']
    Object.keys(languageGloss).forEach((key: string) => {
      if (glossary[key]) {
        glossary[key]['sections'] = languageGloss[key]['sections']
      }
    })
    glossJson = JSON.stringify(glossary)
  }
  return glossJson
}

const isLearningPath = function(course: Course) {
  const c = toc.find((t: { url: string; }) => {
    return t.url === `/${course.id}`
  })
  return c ? c.type === 'learning-path' : false
}

const findPrevSection = function(course: Course, section: Section) {
  const prevSection = course.sections[course.sections.indexOf(section) - 1]
  if (prevSection) return {section: prevSection}
}

const findNextSection = function (course: Course, section: Section) {
  const nextSection = course.sections[course.sections.indexOf(section) + 1]
  if (nextSection) {
    return {section: nextSection}
  } else if (!isLearningPath(course)) {
    const nextCourse = getCourse(course.nextCourse, course.locale)!
    if (nextCourse) return {course: nextCourse, section: nextCourse.sections[0]}
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

const TRANSLATIONS: Record<string, Record<string, string>> = {};
for (const locale of AVAILABLE_LOCALES) {
  if (locale.id === 'en') continue;
  TRANSLATIONS[locale.id] = loadCombinedYAML(`translations/${locale.id}/strings.yaml`) as Record<string, string>;
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
  toc,
  findNextSection,
  findPrevSection,
  getSectionIndex,
  isLearningPath,
  updateGlossary,
  loadLocaleRawFile
}
