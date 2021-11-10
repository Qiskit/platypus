import { Request } from 'express'

import {
  APIResponse, Course, Section, SectionProgressData
} from '@mathigon/studio/server/interfaces'

import { connection } from './app'
import { CommunityUser, CommunityUserProgression, Progression } from "./entity/"

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
  
  let out: APIResponse<void> = { status: 400 }

  connection
    .then(async connection => {
      // get user
      let user = await connection.manager.findOne(CommunityUser, req.params.communityUserID)
      
      // get user's progress
      let userProgress = await connection.manager.findOne(CommunityUserProgression, user?.communityUserProgressionID)

      // change user's progress, either by adding the new section or by updating it
      const progresssion = userProgress?.progression;
      progresssion![course.id][section.id] = req.body.data
      connection.manager.save(userProgress)

      out.status = 200
    })
    .catch(error => {
        out.status = 500
        out.error = error
    });

  return out
}

const getProgressData = function (
  req: Request, course: Course, section: Section
): APIResponse<SectionProgressData>|undefined {

  let out: APIResponse<SectionProgressData> = { status: 400 }

  connection
    .then(async connection => {
      // get user
      let user = await connection.manager.findOne(CommunityUser, req.params.communityUserID)
      
      // get user's progress
      let userProgress = await connection.manager.findOne(CommunityUserProgression, user?.communityUserProgressionID)

      const progresssion: Progression = userProgress?.progression!

      out.status = 200
      out.data = progresssion[course.id][section.id]
    })
    .catch(error => {
        out.status = 500
        out.error = error
    });

  return out
}

const clearProgressData = function (
  req: Request, course: Course
): APIResponse<void>|undefined {

  let out: APIResponse<void> = { status: 400 }

  connection
    .then(async connection => {
      // get user
      let user = await connection.manager.findOne(CommunityUser, req.params.communityUserID)
      
      // get user's progress
      let userProgress = await connection.manager.findOne(CommunityUserProgression, user?.communityUserProgressionID)

      // set the progress for this course to nothing
      userProgress!.progression![course.id] = {}
      connection.manager.save(userProgress)
        
      out.status = 200
    })
    .catch(error => {
        out.status = 500
        out.error = error
    });

  return out
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
