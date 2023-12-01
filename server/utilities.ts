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

const TEXTBOOK_HOME = 'https://qiskit.org/learn'
const LEARNING_HOME = 'https://learning.quantum.ibm.com'
const TEXTBOOK_GITHUB = 'https://github.com/Qiskit/textbook/tree/main/notebooks'
const BOX_URL = 'https://ibm.box.com/'

const LEARNING_REDIRECTS = {
  '/course/algorithm-design': `${LEARNING_HOME}/course/variational-algorithm-design`,
  '/course/algorithm-design/*': `${LEARNING_HOME}/course/variational-algorithm-design`,
  '/course/basics': `${LEARNING_HOME}/course/basics-of-quantum-information`,
  '/course/basics/*': `${LEARNING_HOME}/course/basics-of-quantum-information`,
  '/course/algorithms': `${LEARNING_HOME}/course/fundamentals-of-quantum-algorithms`,
  '/course/algorithms/*': `${LEARNING_HOME}/course/fundamentals-of-quantum-algorithms`
}

const GITHUB_REDIRECTS = {
  '/v1/*': 'https://github.com/Qiskit/textbook/tree/maintenance/v1.x',
  '/course/introduction': `${TEXTBOOK_GITHUB}/intro`,
  '/course/introduction/*': `${TEXTBOOK_GITHUB}/intro`,
  '/course/machine-learning': `${TEXTBOOK_GITHUB}/quantum-machine-learning`,
  '/course/machine-learning/*': `${TEXTBOOK_GITHUB}/quantum-machine-learning`,
  '/course/ch-prerequisites': `${TEXTBOOK_GITHUB}/ch-prerequisites`,
  '/course/ch-prerequisites/*': `${TEXTBOOK_GITHUB}/ch-prerequisites`,
  '/course/ch-states': `${TEXTBOOK_GITHUB}/ch-states`,
  '/course/ch-states/*': `${TEXTBOOK_GITHUB}/ch-states`,
  '/course/ch-gates': `${TEXTBOOK_GITHUB}/ch-gates`,
  '/course/ch-gates/*': `${TEXTBOOK_GITHUB}/ch-gates`,
  '/course/ch-algorithms': `${TEXTBOOK_GITHUB}/ch-algorithms`,
  '/course/ch-algorithms/*': `${TEXTBOOK_GITHUB}/ch-algorithms`,
  '/course/quantum-hardware-pulses': `${TEXTBOOK_GITHUB}/quantum-hardware-pulses`,
  '/course/quantum-hardware-pulses/*': `${TEXTBOOK_GITHUB}/quantum-hardware-pulses`,
  '/course/quantum-hardware': `${TEXTBOOK_GITHUB}/quantum-hardware`,
  '/course/quantum-hardware/*': `${TEXTBOOK_GITHUB}/quantum-hardware`,
  '/course/ch-applications': `${TEXTBOOK_GITHUB}/ch-applications`,
  '/course/ch-applications/*': `${TEXTBOOK_GITHUB}/ch-applications`,
  '/course/ch-labs': `${TEXTBOOK_GITHUB}/ch-labs`,
  '/course/ch-labs/*': `${TEXTBOOK_GITHUB}/ch-labs`,
  '/course/ch-demos': `${TEXTBOOK_GITHUB}/ch-demos`,
  '/course/ch-demos/*': `${TEXTBOOK_GITHUB}/ch-demos`,
  '/course/ch-appendix': `${TEXTBOOK_GITHUB}/ch-appendix`,
  '/course/ch-appendix/*': `${TEXTBOOK_GITHUB}/ch-appendix`
}

const SYLLABI_REDIRECTS = {
  '/syllabus/7E7-8CC': `${BOX_URL}v/qcprereqmath`,
  '/syllabus/SFH-RXE': `${BOX_URL}v/qe23-captain-82`,
  '/syllabus/BMK-Q8E': `${BOX_URL}v/qe23-navigator-56`,
  '/syllabus/W7V-S2R': `${BOX_URL}v/qe23-traveler-48`,
  '/syllabus/AFC-XW1': `${BOX_URL}v/qe23-combatant-23`,
  '/syllabus/8N1-ZGF': `${BOX_URL}s/0yenwa0ihnj62au3glzjxralrd3mogtd`,
  '/syllabus/TVP-NSE': `${BOX_URL}s/3wkgjcbf4w6zgxq8el52g8q21y4jgpej`,
  '/syllabus/47X-43S': `${BOX_URL}s/0g893xv62s36rb9i92amccmxx8ps8mzy`,
  '/syllabus/WUB-DCY': `${BOX_URL}s/nhzysimhfpv20l3hwgcyro08d7rhrioj`,
  '/syllabus/ESZ-6NJ': `${BOX_URL}s/2s8wu5nvgydhf1eyp5hu06r5p1ogom9j`,
  '/syllabus/8XH-8Q9': `${BOX_URL}s/v4v4qeth0vaj05toeqqss6itbiki9wn6`,
  '/syllabus/P6J-QPD': `${BOX_URL}s/4dscrgx5hjn55mq861euq3026kl3em8x`,
  '/syllabus/LDZ-XN1': `${BOX_URL}s/26v8fkcc7wn9wkyatkfsje7yvj7nochv`
}

// NOTE: if changing this also update the same variable in 'converter/common.ts'
const LATEST_TEXTBOOK_VERSION = 'v2'

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

const removeVersionPrefix = function (courseId: string) {
  // Removes prefixes of the form v2.0_
  // E.g. `v2_introduction` --> `introduction`
  return courseId.replace(/v[\d.]+_/, '')
}

export {
  CONFIG,
  COURSES,
  NOTATIONS,
  GLOSSARY,
  TEXTBOOK_HOME,
  LEARNING_HOME,
  LATEST_TEXTBOOK_VERSION,
  TRANSLATIONS,
  UNIVERSAL_NOTATIONS,
  TOC,
  LEARNING_REDIRECTS,
  GITHUB_REDIRECTS,
  SYLLABI_REDIRECTS,
  findNextSection,
  findPrevSection,
  getSectionIndex,
  isLearningPath,
  updateGlossary,
  loadLocaleRawFile,
  tocFilterByType,
  removeVersionPrefix
}
