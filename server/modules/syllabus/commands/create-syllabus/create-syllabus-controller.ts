import { Request, Response, NextFunction } from 'express'

import { UnauthorizedException } from '../../../../libs/exceptions/unauthorized-exception'

import { Syllabus } from '../../domain/syllabus'
import { CreateSyllabusHttpRequest } from './create-syllabus-dto'
import { CreateSyllabusService } from './create-syllabus-service'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const CreateSyllabusController = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || !req.user.acceptedPolicies) {
    const error = new UnauthorizedException()
    res.status(error.code)
    return res.json(error)
  }

  const { body } = req
  const userId = req.user.id

  const syllabus = new CreateSyllabusHttpRequest({ ...body, owners: [userId] })

  // TODO: This response must be a type from a domain or an exception
  let response: Syllabus | unknown
  try {
    await syllabus.validate()
    response = await CreateSyllabusService.execute(syllabus)
  } catch (error) {
    // TODO: update res.status when we start to use our internal exceptions
    response = error
    // TODO: implemente new log system
    // eslint-disable-next-line no-console
    console.log(error)
  }

  return res.json(response)
}
