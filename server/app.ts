// =============================================================================
// Project Platypus
// =============================================================================

import { MathigonStudioApp } from '@mathigon/studio/server/app'
import { getCourse } from '@mathigon/studio/server/utilities'

import {
  CONFIG, COURSES, NOTATIONS, TEXTBOOK_HOME, UNIVERSAL_NOTATIONS,
  findNextSection, findPrevSection, getSectionIndex, isLearningPath, updateGlossary
} from './utilities'
import * as storageApi from './storage'

new MathigonStudioApp()
  .get('/health', (req, res) => res.status(200).send('ok'))  // Server Health Checks
  .secure()
  .setup({sessionSecret: 'project-platypus-beta'})
  .redirects({
    '/': TEXTBOOK_HOME,
    '/textbook': TEXTBOOK_HOME
  })
  .get('/course/:course/:section', async (req, res, next) => {
    const course = getCourse(req.params.course, req.locale.id)
    const section = course?.sections.find(s => s.id === req.params.section)
    if (!course || !section) return next()

    const lang = course.locale || 'en'
    const learningPath = isLearningPath(course)
    const response = await storageApi.getProgressData?.(req, course, section)
    const progressJSON = JSON.stringify(response?.data || {})
    const notationsJSON = JSON.stringify(NOTATIONS[lang] || {})
    const universalJSON = JSON.stringify(UNIVERSAL_NOTATIONS[lang] || {})
    course.glossJSON = updateGlossary(course)

    const nextSection = findNextSection(course, section)
    const prevSection = findPrevSection(course, section)

    const subsections = getSectionIndex(course, section)

    res.render('textbook', {
      course, section, config: CONFIG,
      progressJSON, notationsJSON, learningPath,
      nextSection, prevSection, universalJSON,
      subsections, textbookHome: TEXTBOOK_HOME
    });
  })
  .course(storageApi)
  .errors()
  .listen();
