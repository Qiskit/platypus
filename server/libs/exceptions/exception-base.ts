import { IS_PRODUCTION } from '../../configuration'

export interface SerializedException {
  code: number;
  name: string;
  message: string;
  stack?: string;
  metadata?: unknown;
}

export abstract class ExceptionBase extends Error {
  constructor (readonly message: string, readonly metadata?: unknown) {
    super(message)
    Error.captureStackTrace(this, this.constructor)
  }

  abstract code: number

  abstract name: string

  toJSON (): SerializedException {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      // TODO: improve the logic to send the stack only with development
      stack: !IS_PRODUCTION ? this.stack : undefined,
      metadata: this.metadata
    }
  }
}
