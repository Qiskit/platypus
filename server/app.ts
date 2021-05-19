// =============================================================================
// Project Platypus
// =============================================================================

import { MathigonStudioApp } from '@mathigon/studio/server/app'
import { getCourse } from '@mathigon/studio/server/utilities'

import {
  CONFIG, COURSES, NOTATIONS, UNIVERSAL_NOTATIONS, findNextSection, findPrevSection, isLearningPath, updateGlossary
} from './utilities'
import * as storageApi from './storage'

new MathigonStudioApp()
  .get('/health', (req, res) => res.status(200).send('ok'))  // Server Health Checks
  .setup({sessionSecret: 'project-platypus-beta'})
  .redirects({ '/': 'https://qiskitorg-git-feature-textbook-demo-qiskit.vercel.app/textbook-demo' })
  .get('/textbook', (req, res) => res.render('index.pug', { 
    courses: COURSES.textbookCourses,
    learningPaths: COURSES.learningPaths,
    excludedCourses: COURSES.excludedCourses
  }))
  .get('/course/:course/:section', async (req, res, next) => {
    const course = getCourse(req.params.course, req.locale.id)
    const section = course?.sections.find(s => s.id === req.params.section)
    if (!course || !section) return next()

    const learningPath = isLearningPath(course)
    const response = await storageApi.getProgressData?.(req, course, section)
    const progressJSON = JSON.stringify(response?.data || {})
    const notationsJSON = JSON.stringify(NOTATIONS || {})
    const universalJSON = JSON.stringify(UNIVERSAL_NOTATIONS || {})
    course.glossJSON = updateGlossary(course.glossJSON)

    const nextSection = findNextSection(course, section)
    const prevSection = findPrevSection(course, section)

    res.render('textbook', {
      course, section, config: CONFIG,
      progressJSON, notationsJSON, learningPath,
      nextSection, prevSection, universalJSON
    });
  })
  .course(storageApi)
  .errors()
  .listen(5000);
