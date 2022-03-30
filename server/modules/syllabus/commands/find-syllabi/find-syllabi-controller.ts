import { Request, Response, NextFunction } from 'express'

import { ExceptionBase } from '../../../../libs/exceptions/exception-base'
import { UnauthorizedException } from '../../../../libs/exceptions/unauthorized-exception'

import { Syllabus } from '../../domain/syllabus'
import { SyllabusQueryParamsHttpRequest } from './find-syllabi-dto'
import { FindSyllabiService } from './find-syllabi-service'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const FindSyllabiController = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || !req.user.acceptedPolicies) {
    const error = new UnauthorizedException()
    res.status(error.code)
    return res.json(error)
  }

  const { limit, page } = req.query
  const userId = req.user.id

  // Note: this object doesn't introduce external data so there is no need to validate it by now
  const queryParams = new SyllabusQueryParamsHttpRequest({
    limit: (limit !== undefined ? parseInt(limit as string) : limit),
    page: (page !== undefined ? parseInt(page as string) : page),
    owner: userId
  })

  let response: Syllabus[] | unknown
  try {
    response = await FindSyllabiService.execute(queryParams)
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

  return res.json(response)
}
