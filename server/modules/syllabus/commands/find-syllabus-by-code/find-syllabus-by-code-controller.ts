import { Request, Response, NextFunction } from 'express'

import { ExceptionBase, SerializedException } from '../../../../libs/exceptions/exception-base'

import { Syllabus } from '../../domain/syllabus'
import { FindSyllabusByCodeHttpRequest } from './find-syllabus-by-code-dto'
import { FindSyllabusByIdService } from './find-syllabus-by-code-service'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const FindSyllabusByCodeController = async (req: Request, res: Response, next: NextFunction) => {
  const { code } = req.params

  const findSyllabusByCodeHttpRequest = new FindSyllabusByCodeHttpRequest({ code })

  let response: Syllabus | SerializedException
  try {
    response = await FindSyllabusByIdService.execute(findSyllabusByCodeHttpRequest)
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

  res.render('syllabus', {
    syllabus: response
  })
}
