import { ExceptionBase } from './exception-base';
import { ExceptionCodes } from './exception-codes';

export class NotImplementedException extends ExceptionBase {
  constructor(message = 'Method not implemented') {
    super(message);
  }

  readonly code = ExceptionCodes.notImplemented;
}
