import { ExceptionBase } from './exception-base'
import { ExceptionCodes } from './exception-codes'

export class UnauthorizedException extends ExceptionBase {
  constructor (message = 'User not authenticated') {
    super(message)
  }

  readonly code = ExceptionCodes.unauthorized

  readonly httpError = 401
}
