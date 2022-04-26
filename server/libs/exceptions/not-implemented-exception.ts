import { ExceptionBase } from './exception-base'
import { ExceptionNames } from './exception-names'

export class NotImplementedException extends ExceptionBase {
  constructor (message = 'Method not implemented') {
    super(message)
  }

  readonly code = 501

  readonly name = ExceptionNames.notImplemented
}
