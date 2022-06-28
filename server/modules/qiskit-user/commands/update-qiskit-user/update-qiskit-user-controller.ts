import { Request, Response, NextFunction } from 'express'

import { ExceptionBase, SerializedException } from '../../../../libs/exceptions/exception-base'
import { UnauthorizedException } from '../../../../libs/exceptions/unauthorized-exception'
import { logger } from '../../../../libs/logger/logger'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const CreateSyllabusController = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || !req.user.acceptedPolicies) {
    const error = new UnauthorizedException()
    res.status(error.code)
    return res.json(error)
  }

  const { body } = req
  const userId = req.user.id

  
}
