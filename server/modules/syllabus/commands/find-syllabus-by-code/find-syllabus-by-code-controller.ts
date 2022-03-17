import { Request, Response, NextFunction } from 'express'

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
    // TODO: update res.status when we start to use our internal exceptions
    response = error
    // TODO: implemente new log system
    // eslint-disable-next-line no-console
    console.log(error)
  }

  res.render('syllabus', {
    syllabus: response
  })
}
