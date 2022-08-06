import { Request, Response, NextFunction } from 'express'

import { ExceptionBase, SerializedException } from '../../../../libs/exceptions/exception-base'
import { UnauthorizedException } from '../../../../libs/exceptions/unauthorized-exception'
import { logger } from '../../../../libs/logger/logger'

import { QiskitUser } from '../../domain/qiskit-user'
import { FindQiskitUserByUserHttpRequest } from './find-qiskit-user-dto'
import { FindQiskitUserByUserService } from './find-qiskit-user-service'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const FindQiskitUserController = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || !req.user.acceptedPolicies) {
    const error = new UnauthorizedException()
    res.status(error.code)
    return res.json(error)
  }

  const userId = req.user.id

  const qiskitUser = new FindQiskitUserByUserHttpRequest({ user: userId })

  let response: QiskitUser | SerializedException
  try {
    response = await FindQiskitUserByUserService.execute(qiskitUser)
  } catch (error) {
    if (error instanceof ExceptionBase) {
      res.status(error.code)
      response = error.toJSON()
    } else {
      res.status(500)
      response = error as any
    }
    logger.error(response)
  }

  return res.json(response)
}
