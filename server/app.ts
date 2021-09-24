// =============================================================================
// Project Platypus
// =============================================================================

import { Request } from 'express';

import { MathigonStudioApp } from '@mathigon/studio/server/app'
import { getCourse } from '@mathigon/studio/server/utilities'

import { LOCALES } from '@mathigon/studio/server/i18n'
import {
  CONFIG, NOTATIONS, TEXTBOOK_HOME, TRANSLATIONS, UNIVERSAL_NOTATIONS,
  findNextSection, findPrevSection, getSectionIndex, isLearningPath, updateGlossary
} from './utilities'
import * as storageApi from './storage'

import { translate } from '@mathigon/studio/server/i18n'

const getCourseData = async function (req: Request) {
  const course = getCourse(req.params.course, req.locale.id)
  const section = course?.sections.find(s => s.id === req.params.section)

  if (!course || !section) { return null }

  const lang = course.locale || 'en'
  const learningPath = isLearningPath(course)

  const response = await storageApi.getProgressData?.(req, course, section)
  const progressJSON = JSON.stringify(response?.data || {})
  const notationsJSON = JSON.stringify(NOTATIONS[lang] || {})
  const universalJSON = JSON.stringify(UNIVERSAL_NOTATIONS[lang] || {})
  const translationsJSON = JSON.stringify(TRANSLATIONS[lang] || {})

  course.glossJSON = updateGlossary(course)

  const nextSection = findNextSection(course, section)
  const prevSection = findPrevSection(course, section)
  const subsections = getSectionIndex(course, section)

  return {
    course,
    section,
    config: CONFIG,
    progressJSON,
    notationsJSON,
    learningPath,
    nextSection,
    prevSection,
    universalJSON,
    translationsJSON,
    subsections,
    textbookHome: TEXTBOOK_HOME,
    // override `__()`  to pass in the course locale instead of default req locale
    __: (str: string, ...args: string[]) => translate(lang, str, args)
  }
}

new MathigonStudioApp()
  .get('/health', (req, res) => res.status(200).send('ok')) // Server Health Checks
  .secure()
  .setup({ sessionSecret: 'project-platypus-beta' })
  .redirects({
    '/': TEXTBOOK_HOME,
    '/textbook': TEXTBOOK_HOME
  })
  .get('/locales/:locale', async (req, res) => {
    const translations = TRANSLATIONS[req.params.locale || 'en'] || {}
    res.json(translations)
  })
  .use(async (req, res, next) => {
    res.locals.availableLocales = CONFIG.locales.map((l) => {
      return LOCALES[l]
    })
    next()
  })
  .get('/summer-school/:course', (req, res, next) => {
    // redirect to first lecture when no lecture specified
    const course = getCourse(req.params.course, req.locale.id)
    return course ? res.redirect(`/summer-school/${course.id}/${course.sections[0].id}`) : next();
  })
  .get('/summer-school/:course/:section', async(req, res, next) => {
    // example URL: /summer-school/2021/lec1-2
    // :course - refers to the summer school year
    // :section - refers to the lecture id
    const courseData = await getCourseData(req)

    courseData?.course.sections.forEach(section => {
      // Mathigon by default set url as 'course/'
      section.url = section.url.replace('course/', 'summer-school/')
    })

    if (!courseData) {
      return next()
    } else {
      res.render('textbook', courseData)
    }
  })
  .get('/course/:course/:section', async (req, res, next) => {
    const courseData = await getCourseData(req)

    if (!courseData) {
      return next()
    } else {
      res.render('textbook', courseData)
    }
  })
  .course(storageApi)
  .errors()
  .listen()
