import { Request, Response, NextFunction } from 'express'

import { UnauthorizedException } from '../../../../libs/exceptions/unauthorized-exception'
import { Syllabus } from '../../domain/syllabus'
import { FindSyllabusByCodeHttpRequest } from './find-syllabus-by-code-dto'
import { FindSyllabusByIdService } from './find-syllabus-by-code-service'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const FindSyllabusByCodeController = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || !req.user.acceptedPolicies) {
    const error = new UnauthorizedException()
    res.status(error.code)
    return res.json(error)
  }

  const userId = req.user.id
  const { code } = req.params

  const findSyllabusByCodeHttpRequest = new FindSyllabusByCodeHttpRequest({ code, owner: userId })

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

  return res.json(response)
}
