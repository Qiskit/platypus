export interface SerializedException {
    message: string;
    code: string;
    httpError: number,
    stack?: string;
    metadata?: unknown;
}

export abstract class ExceptionBase extends Error {
  constructor (readonly message: string, readonly metadata?: unknown) {
    super(message)
    Error.captureStackTrace(this, this.constructor)
  }

  abstract code: string

  abstract httpError: number

  toJSON (): SerializedException {
    return {
      message: this.message,
      code: this.code,
      httpError: this.httpError,
      // TODO: improve the logic to send the stack only with development
      stack: (process.env.node_env !== 'production') ? this.stack : undefined,
      metadata: this.metadata
    }
  }
}
