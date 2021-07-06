import * as path from 'path'

import { Course, Section } from '@mathigon/studio/server/interfaces'
import { CONFIG as mConfig, CONTENT_DIR, PROJECT_DIR, getCourse, loadYAML } from '@mathigon/studio/server/utilities'

import {
  Analytics,
  AnalyticsEntry,
  AnalyticsConfig,
  NotationsMap,
  Subsection,
  TocCourse
} from './interfaces'

const TEXTBOOK_HOME = 'https://qiskitorg-git-feature-textbook-demo-qiskit.vercel.app/textbook-beta'

const CONFIG: AnalyticsConfig = <AnalyticsConfig>mConfig

const analytics: AnalyticsEntry = process.env.NODE_ENV === 'production'
  ? (<Analytics>CONFIG.analytics).production
  : (<Analytics>CONFIG.analytics).development

CONFIG.analytics = analytics

const toc: [TocCourse] = (loadYAML(path.join(PROJECT_DIR, 'notebooks/toc.yaml')) || []) as [TocCourse]

const sectionIndexes: {[x: string]: Subsection[]} = {}

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

const NOTATIONS: NotationsMap = (loadYAML(path.join(CONTENT_DIR, 'shared/notations.yaml')) || {}) as NotationsMap
const GLOSSARY: {[x: string]: any} = (loadYAML(path.join(CONTENT_DIR, 'shared/glossary.yaml')) || {}) as object
const UNIVERSAL_NOTATIONS: Array<any> = Object.values((loadYAML(path.join(CONTENT_DIR, 'shared/universal.yaml')) || {}) as object)

const updateGlossary = function(glossJson: string): string {
  if (glossJson) {
    const glossary = JSON.parse(glossJson)
    Object.keys(GLOSSARY).forEach((key: string) => {
      if (glossary[key]) {
        glossary[key]['sections'] = GLOSSARY[key]['sections']
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
    return {course: nextCourse, section: nextCourse.sections[0]}
  }
}

const getSectionIndex = function (course: Course, section: Section) {
  const sectionId = `${course.id}/${section.id}`
  if (!sectionIndexes[sectionId]) {
    const courseIndex = (
      loadYAML(path.join(CONTENT_DIR, `${course.id}/index.yaml`)) || []
    ) as {[x: string]: Subsection[]}
    sectionIndexes[sectionId] = courseIndex[section.id]
  }
  return sectionIndexes[sectionId] || []
}


export {
  CONFIG,
  COURSES,
  NOTATIONS,
  GLOSSARY,
  TEXTBOOK_HOME,
  UNIVERSAL_NOTATIONS,
  findNextSection,
  findPrevSection,
  getSectionIndex,
  isLearningPath,
  updateGlossary
}
