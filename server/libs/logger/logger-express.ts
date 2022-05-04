import { stdTimeFunctions } from 'pino'
import { pinoHttp } from 'pino-http'

import { IS_PRODUCTION } from '../../configuration'

const level = IS_PRODUCTION ? 'info' : 'debug'

export const loggerExpress = pinoHttp({
  level,
  timestamp: stdTimeFunctions.isoTime
})
