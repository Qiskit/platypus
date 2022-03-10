import { ExceptionBase } from './exception-base'
import { ExceptionNames } from './exception-names'

export class UnauthorizedException extends ExceptionBase {
  constructor (message = 'User not authenticated') {
    super(message)
  }

  readonly code = 401

  readonly name = ExceptionNames.unauthorized
}
