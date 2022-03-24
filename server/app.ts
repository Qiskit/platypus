// =============================================================================
// Project Platypus
// =============================================================================

import { Request } from 'express'
import { customAlphabet } from 'nanoid/non-secure'

import { MathigonStudioApp } from '@mathigon/studio/server/app'
import { getCourse } from '@mathigon/studio/server/utilities/utilities'

import { LOCALES, translate } from '@mathigon/studio/server/utilities/i18n'
import {
  CONFIG, NOTATIONS, TEXTBOOK_HOME, TRANSLATIONS, UNIVERSAL_NOTATIONS,
  findNextSection, findPrevSection, getSectionIndex, isLearningPath,
  updateGlossary, loadLocaleRawFile, tocFilterByType
} from './utilities'
import { TocCourse } from './interfaces'
import * as storageApi from './storage'

// Syllabus
import { CreateSyllabusController } from './modules/syllabus/commands/create-syllabus/create-syllabus-controller'
import { FindSyllabiController } from './modules/syllabus/commands/find-syllabi/find-syllabi-controller'
import { FindSyllabusByCodeController } from './modules/syllabus/commands/find-syllabus-by-code/find-syllabus-by-code-controller'
import { UpdateSyllabusController } from './modules/syllabus/commands/update-syllabus/update-syllabus-controller'

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
  .setup({ sessionSecret: 'project-platypus-beta', csrfBlocklist: ['/profile/accept-policies', '/syllabus'] })
  // .redirects({'/login': '/signin'})
  .accounts()
  .redirects({
    '/': TEXTBOOK_HOME,
    '/textbook': TEXTBOOK_HOME
  })
  .get('/locales/:locale', (req, res) => {
    const translations = TRANSLATIONS[req.params.locale || 'en'] || {}
    res.json(translations)
  })
  // eslint-disable-next-line require-await
  .use(async (req, res, next) => {
    res.locals.availableLocales = CONFIG.locales.map((l) => {
      return LOCALES[l]
    })
    next()
  })
  .get('/courseList', (req, res) => {
    res.json(tocFilterByType())
  })
  .get('/courseList/:type', (req, res) => {
    let type = req.params.type || ''
    if (type === 'none') {
      type = ''
    }
    const courses: TocCourse[] = tocFilterByType(type)
    res.json(courses)
  })
  .get('/delete/account', async (req, res) => {
    if (!req.user) {
      return { error: 'unauthenticated', errorCode: 401, redirect: '/signin' }
    }

    const alphabet = 'abcdefghijklmnopqrstuvwxyz'
    // 21 value is to maintain the probability collision similar to UUIDv4
    const nanoid = customAlphabet(alphabet, 21)
    const randomString = nanoid()
    req.user.email = `deleted-${randomString}@qiskit.org`
    req.user.firstName = randomString
    req.user.lastName = randomString
    req.user.picture = ''
    req.user.oAuthTokens = [
      `qiskit:${randomString}`
    ]

    try {
      await req.user.save()
    } catch (error) {
      // TODO: we must improve our logs
      console.error(error)
    }

    res.redirect('/logout')
  })
  .get('/account', (req, res) => {
    if (!req.user) {
      return res.redirect('/signin')
    }
    if (req.user && !req.user.acceptedPolicies) {
      return res.redirect('/eula')
    }

    const lang = req.locale.id || 'en'
    const translationsJSON = JSON.stringify(TRANSLATIONS[lang] || {})

    const privacyPolicyMD = loadLocaleRawFile('privacy-policy.md', lang)

    const userMockData = {
      firstName: req.user?.firstName,
      lastName: req.user?.lastName
    }

    res.render('userAccount', {
      config: CONFIG,
      userData: userMockData,
      lang,
      privacyPolicyMD,
      translationsJSON
    })
  })
  .get('/eula', (req, res) => {
    if (!req.user) {
      return res.redirect('/signin')
    }

    const lang = req.locale.id || 'en'
    const translationsJSON = JSON.stringify(TRANSLATIONS[lang] || {})

    const privacyPolicyMD = loadLocaleRawFile('privacy-policy.md', lang)

    res.render('eula', {
      config: CONFIG,
      lang,
      privacyPolicyMD,
      translationsJSON
    })
  })
  .get('/summer-school/:course', (req, res, next) => {
    // redirect to first lecture when no lecture specified
    const course = getCourse(req.params.course, req.locale.id)
    return course ? res.redirect(`/summer-school/${course.id}/${course.sections[0].id}`) : next()
  })
  .get('/summer-school/:course/:section', async (req, res, next) => {
    // example URL: /summer-school/2021/lec1-2
    // :course - refers to the summer school year
    // :section - refers to the lecture id
    const courseData = await getCourseData(req)

    courseData?.course.sections.forEach((section: any) => {
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
  .get('/signin', (req, res) => {
    if (req.user && req.user.acceptedPolicies) {
      return res.redirect('/account')
    }

    const lang = req.locale.id || 'en'
    const translationsJSON = JSON.stringify(TRANSLATIONS[lang] || {})

    res.render('signIn', {
      textbookHome: TEXTBOOK_HOME,
      config: CONFIG,
      lang,
      translationsJSON
    })
  })
  .get('/syllabus/create', (req, res) => {
    res.render('syllabusCreate')
  })
  .get('/syllabus', FindSyllabiController)
  .get('/syllabus/:code', FindSyllabusByCodeController)
  .post('/syllabus', CreateSyllabusController)
  // Here we use POST instead of PUT because Mathigon doesn't support PUT requests
  .post('/syllabus/:id', UpdateSyllabusController)
  .course({})
  .errors()
  .listen()
