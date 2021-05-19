import { Request } from 'express'

import {
  APIResponse, Course, Section, SectionProgressData
} from '@mathigon/studio/server/interfaces'

// const STORAGE_KEY = 'qiskit/textbook/course'
// const merge = function (target, source) {
//   for (const key of Object.keys(source)) {
//     if (target[key] instanceof Object) {
//       const m = merge(target[key], source[key])
//       Object.assign(source[key], m)
//     }
//   }
//   Object.assign(target || {}, source)
//   return target
// }

const setProgressData = function (
  req: Request, course: Course, section: Section
): APIResponse<void>|undefined {

  console.error('setProgressData not yet implemented')
  console.log(course.id, section.id, req.body)

  return undefined
}

const getProgressData = function (
  req: Request, course: Course, section: Section
): APIResponse<SectionProgressData>|undefined {

  console.error('getProgressData not yet implemented')

  return undefined
}

const clearProgressData = function (
  req: Request, course: Course
): APIResponse<void>|undefined {

  console.error('clearProgressData not yet implemented')

  return undefined
}

// const sendFeedback = function (
//   req: Request, course: Course
// ): APIResponse<void>|undefined {

//   console.error('sendFeedback not yet implemented')
//   return undefined
// }

// const askTutor = function (
//   req: Request, course: Course
// ): APIResponse<undefined>|undefined {

//   console.error('askTutor not yet implemented')
//   return undefined
// }

export {
  setProgressData,
  getProgressData,
  clearProgressData
}
