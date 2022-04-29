import { stdTimeFunctions } from 'pino'
import { pinoHttp } from 'pino-http'

export const loggerExpress = pinoHttp({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  timestamp: stdTimeFunctions.isoTime
})
