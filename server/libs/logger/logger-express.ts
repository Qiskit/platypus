import { stdTimeFunctions } from 'pino'
import { pinoHttp } from 'pino-http'

const isProd = process.env.NODE_ENV === 'production'

const level = isProd ? 'info' : 'debug'

export const loggerExpress = pinoHttp({
  level,
  timestamp: stdTimeFunctions.isoTime
})
