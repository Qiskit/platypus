import { Request, Response, NextFunction } from 'express'

import { ExceptionBase } from '../../../../libs/exceptions/exception-base'

import { Syllabus } from '../../domain/syllabus'
import { FindSyllabusByCodeHttpRequest } from './find-syllabus-by-code-dto'
import { FindSyllabusByIdService } from './find-syllabus-by-code-service'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const FindSyllabusByCodeController = async (req: Request, res: Response, next: NextFunction) => {
  const { code } = req.params

  const findSyllabusByCodeHttpRequest = new FindSyllabusByCodeHttpRequest({ code })

  // TODO: This response must be a type from a domain or an exception
  let response: Syllabus | unknown
  try {
    response = await FindSyllabusByIdService.execute(findSyllabusByCodeHttpRequest)
  } catch (error) {
    if (error instanceof ExceptionBase) {
      res.status(error.code)
      response = error.toJSON()
    } else {
      res.status(500)
      response = error
    }
    // TODO: implemente new log system
    // eslint-disable-next-line no-console
    console.error(response)
  }

  res.render('syllabus', {
    syllabus: response
  })
}
