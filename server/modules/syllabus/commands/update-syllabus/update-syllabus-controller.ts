import { Request, Response, NextFunction } from 'express'

import { ExceptionBase, SerializedException } from '../../../../libs/exceptions/exception-base'
import { UnauthorizedException } from '../../../../libs/exceptions/unauthorized-exception'

import { Syllabus } from '../../domain/syllabus'
import { UpdateSyllabusHttpRequest } from './update-syllabus-dto'
import { UpdateSyllabusService } from './update-syllabus-service'

// eslint-disable-next-line @typescript-eslint/no-unused-vars, require-await
export const UpdateSyllabusController = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || !req.user.acceptedPolicies) {
    const error = new UnauthorizedException()
    res.status(error.code)
    return res.json(error)
  }

  const { body } = req
  const { id } = req.params
  const userId = req.user.id

  const syllabus = new UpdateSyllabusHttpRequest(id, userId, { ...body })

  let response: Syllabus | SerializedException
  try {
    await syllabus.validate()
    response = await UpdateSyllabusService.execute(syllabus)
  } catch (error) {
    if (error instanceof ExceptionBase) {
      res.status(error.code)
      response = error.toJSON()
    } else {
      res.status(500)
      response = error as any
    }
    // TODO: implemente new log system
    // eslint-disable-next-line no-console
    console.error(response)
  }

  return res.json(response)
}
