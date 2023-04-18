// =============================================================================
// Project Platypus
// =============================================================================

import { Request, Response, NextFunction } from 'express'
import { customAlphabet } from 'nanoid/non-secure'

import { MathigonStudioApp } from '@mathigon/studio/server/app'
import { getCourse } from '@mathigon/studio/server/utilities/utilities'
import { Progress } from '@mathigon/studio/server/models/progress'
import { CourseAnalytics } from '@mathigon/studio/server/models/analytics'
import { LOCALES, translate } from '@mathigon/studio/server/utilities/i18n'

import { generateMockData } from './populate-database'

import {
  CONFIG, NOTATIONS, TEXTBOOK_HOME, LATEST_TEXTBOOK_VERSION, TRANSLATIONS, UNIVERSAL_NOTATIONS,
  findNextSection, findPrevSection, getSectionIndex, isLearningPath,
  updateGlossary, loadLocaleRawFile, tocFilterByType, removeVersionPrefix
} from './utilities'
import { TocCourse } from './interfaces'

// Syllabus
import { CreateSyllabusController } from './modules/syllabus/commands/create-syllabus/create-syllabus-controller'
import { FindSyllabiController } from './modules/syllabus/commands/find-syllabi/find-syllabi-controller'
import { FindSyllabusByCodeController } from './modules/syllabus/commands/find-syllabus-by-code/find-syllabus-by-code-controller'
import { UpdateSyllabusController } from './modules/syllabus/commands/update-syllabus/update-syllabus-controller'

// QiskitUser
import { UpdateQiskitUserController } from './modules/qiskit-user/commands/update-qiskit-user/update-qiskit-user-controller'
import { FindQiskitUserController } from './modules/qiskit-user/commands/find-qiskit-user/find-qiskit-user-controller'

// Logger
import { logger } from './libs/logger/logger'

const getCourseData = async function (req: Request) {
  const course = getCourse(req.params.course, req.locale.id)
  const section = course?.sections.find(s => s.id === req.params.section)

  if (!course || !section) { return null }

  const lang = course.locale || 'en'
  const learningPath = isLearningPath(course)

  const progressData = await Progress.lookup(req, course.id)
  const notationsJSON = JSON.stringify(NOTATIONS[lang] || {})
  const universalJSON = JSON.stringify(UNIVERSAL_NOTATIONS[lang] || {})
  const translationsJSON = JSON.stringify(TRANSLATIONS[lang] || {})

  course.glossJSON = updateGlossary(course)

  const nextSection = findNextSection(course, section)
  const prevSection = findPrevSection(course, section)
  const subsections = getSectionIndex(course, section)

  if (req.user) {
    CourseAnalytics.track(req.user.id) // async
  }

  return {
    course,
    section,
    config: CONFIG,
    progressData,
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

const getUserProgressData = async (req: Request) => {
  const userId = req.user?.id || null
  if (!userId) {
    return {}
  }

  const progress: { [key: string]: any } = {}
  const courses = Array.from((await Progress.getUserData(userId)).values())

  for (const course of courses) {
    progress[course.courseId] = course.sections
  }

  return progress
}

const getAccountData = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.redirect('/signin')
  }
  if (!req.user.acceptedPolicies) {
    return res.redirect('/eula')
  }

  if (req.cookies.redirectTo) {
    const syllabusRedirectUrl = req.cookies.redirectTo
    res.clearCookie('redirectTo')
    return res.redirect(syllabusRedirectUrl)
  }

  const lang = req.locale.id || 'en'
  const translationsJSON = JSON.stringify(TRANSLATIONS[lang] || {})

  const privacyPolicyMD = loadLocaleRawFile('privacy-policy.md', lang)

  const loggedInUser = {
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
    userId: req.user.id
  }

  const progressData = await getUserProgressData(req)

  res.render('userAccount', {
    config: CONFIG,
    userData: loggedInUser,
    progressJSON: JSON.stringify(progressData),
    lang,
    privacyPolicyMD,
    translationsJSON
  })
}

const start = () => {
  new MathigonStudioApp()
    .get('/health', (req, res) => res.status(200).send('ok')) // Server Health Checks
    .secure()
    .setup({ sessionSecret: 'project-platypus-beta', csrfBlocklist: ['/profile/accept-policies', '/syllabus', '/qiskit-user'] })
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

      res.clearCookie('redirectTo')

      try {
        await req.user.save()
      } catch (error) {
        logger.error(error)
      }

      res.redirect('/logout')
    })
    .get('/account', (req, res) => res.redirect('/account/learning'))
    .get('/account/learning', getAccountData)
    .get('/account/classroom', getAccountData)
    .get('/account/admin', getAccountData)
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
    .get('/:version/course/:course', (req, res, next) => {
      // redirect to first page when no page specified
      const course = getCourse(`${req.params.version}_${req.params.course}`, req.locale.id)
      return course ? res.redirect(`/${req.params.version}/course/${removeVersionPrefix(course.id)}/${course.sections[0].id}`) : next()
    })
    .get('/:version/course/:course/:section', async (req, res, next) => {
      // example URL: /v1/course/introduction/why-quantum-computing
      // displays content from /course/v1_introduction/why-quantum-computing
      // :version - refers to the textbook version
      req.params.course = `${req.params.version}_${req.params.course}`
      const courseData = await getCourseData(req)

      courseData?.course.sections.forEach((section: any) => {
        // change to form /v1/course/introduction/...
        section.url = section.url.replace('course/', `${req.params.version}/course/`)
        section.url = section.url.replace(req.params.course, removeVersionPrefix(req.params.course))
      })

      if (!courseData) {
        return next()
      } else {
        res.render('textbook', courseData)
      }
    })
    .get('/course/:course', (req, res, next) => {
      // redirect to first page when no page specified
      const course = getCourse(`${LATEST_TEXTBOOK_VERSION}_${req.params.course}`, req.locale.id)
      return course ? res.redirect(`/course/${removeVersionPrefix(course.id)}/${course.sections[0].id}`) : next()
    })
    .get('/course/:course/:section', async (req, res, next) => {
      // example URL: /course/introduction/why-quantum-computing
      // gets content from latest version (e.g. /course/v2_introduction/why-quantum-computing)
      req.params.course = `${LATEST_TEXTBOOK_VERSION}_${req.params.course}`
      const courseData = await getCourseData(req)

      courseData?.course.sections.forEach((section: any) => {
        // change /course/v2_introduction/page --> /course/introduction/page
        section.url = section.url.replace(req.params.course, removeVersionPrefix(req.params.course))
      })

      if (!courseData) {
        return next()
      } else {
        res.render('textbook', courseData)
      }
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
    .get('/problem-sets/:course', (req, res, next) => {
      // redirect to first question if none is specified
      const course = getCourse(req.params.course, req.locale.id)
      return course ? res.redirect(`/problem-sets/${course.id}/${course.sections[0].id}`) : next()
    })
    .get('/problem-sets/:course/:section', async (req, res, next) => {
      // :course - refers to the problem-set id
      // :section - refers to the question id
      // example URL: /problem-sets/single_systems_problem_set/problem-1
      const courseData = await getCourseData(req)

      courseData?.course.sections.forEach((section: any) => {
        // Mathigon by default sets url as 'course/'
        section.url = section.url.replace('course/', 'problem-sets/')
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
      const syllabusRedirect = req.query.returnTo
      if (syllabusRedirect) {
        res.cookie('redirectTo', String(syllabusRedirect))
      }

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
      if (!req.user) {
        return res.redirect('/signin')
      }

      res.render('syllabusCreate')
    })
    .get('/syllabus/edit/:code', async (req, res, next) => {
      if (!req.user) {
        return res.redirect('/signin')
      }
      // TODO check if user is the owner
      const result = await FindSyllabusByCodeController(req, res, next)

      if (res.statusCode === 200) {
        res.render('syllabusCreate', {
          syllabus: JSON.stringify(result)
        })
      } else {
        res.render('error')
      }
    })
    .get('/syllabus', FindSyllabiController)
    .get('/syllabus/:code', async (req: Request, res: Response, next: NextFunction) => {
      const result = await FindSyllabusByCodeController(req, res, next)
      const loggedInUser = {
        firstName: '',
        lastName: ''
      }

      if (req.user) {
        if (!req.user.acceptedPolicies) {
          return res.redirect('/eula')
        }
        loggedInUser.firstName = req.user.firstName
        loggedInUser.lastName = req.user.lastName
      }

      if (res.statusCode === 200) {
        res.render('syllabus', {
          syllabus: JSON.stringify(result),
          userData: loggedInUser
        })
      } else {
        res.render('error')
      }
    })
    .post('/syllabus', CreateSyllabusController)
    // Here we use POST instead of PUT because Mathigon doesn't support PUT requests
    .post('/syllabus/:id', UpdateSyllabusController)
    .get('/qiskit-user', FindQiskitUserController)
    .post('/qiskit-user', UpdateQiskitUserController)
    .course({})
    .errors()
    .listen()
}

start()
generateMockData()
