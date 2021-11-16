import {
  APIResponse, Course, Section, SectionProgressData
} from '@mathigon/studio/server/interfaces'
import { Request } from 'express'
import { getRepository } from 'typeorm'

import { CommunityUser } from './entity/'
import { HttpError } from './http-error'

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

const setProgressData = async function (
  req: Request, course: Course, section: Section
): Promise<APIResponse<void>|undefined> {
  
  let res: APIResponse<void> = { status: 400 }

  try {
    const communityUserRepository = getRepository(CommunityUser)
    const user = await communityUserRepository.findOne(req.params.communityUserID, {relations:['communityUserProgression']})
    
    if(!user) {
      throw new HttpError({
        code: 404, 
        message: `The user ${req.params.communityUserID} does not exist`
      })
    }

    // TODO: the logic to store the new progress needs to be improved
    const progression = user.communityUserProgression?.progression
    progression![course.id][section.id] = req.body.data

    // TODO: check if the user exists to avoid errors
    await communityUserRepository.save(user!)
    
    res.status = 200
  } catch(error: any) {
    if(error instanceof HttpError) {
      res.status = error.code
      res.message = error.message
    } else {
      res.status = 500
      res.error = error.message
    }
  }

  return res
}

const getProgressData = async function (
  req: Request, course: Course, section: Section
): Promise<APIResponse<SectionProgressData>|undefined> {

  const res: APIResponse<SectionProgressData> = { status: 400 }

  try {
  const communityUserRepository = getRepository(CommunityUser)
  const user = await communityUserRepository.findOne(req.params.communityUserID, {relations:['communityUserProgression']})
  
  if(!user) {
    throw new HttpError({
      code: 404, 
      message: `The user ${req.params.communityUserID} does not exist`
    })
  }

  const progression = user.communityUserProgression?.progression

  res.status = 200
  res.data = progression ? progression[course.id][section.id] : undefined
  } catch(error) {
    res.status = 500
    res.error = error as Error
  }

  return res
}

const clearProgressData = async function (
  req: Request, course: Course
): Promise<APIResponse<void>|undefined> {

  const res: APIResponse<void> = { status: 400 }

  try {
    const communityUserRepository = getRepository(CommunityUser)
    const user = await communityUserRepository.findOne(req.params.communityUserID, {relations:['communityUserProgression']})
    
    if(!user) {
      throw new HttpError({
        code: 404, 
        message: `The user ${req.params.communityUserID} does not exist`
      })
    }
    // TODO: the logic to store the new progress needs to be improved
    user.communityUserProgression!.progression![course.id] = {}
    
    // TODO: check if the user exists to avoid errors
    await communityUserRepository.save(user!)
    
    res.status = 200
  } catch(error) {
    res.status = 500
    res.error = error as Error
  }

  return res
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
