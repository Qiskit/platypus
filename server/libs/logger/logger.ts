import { pino, stdTimeFunctions } from 'pino'
import type { Logger, LoggerOptions } from 'pino'

import { IS_PRODUCTION } from '../../configuration'

import { pinoPrettyTransport } from './transports'

const pinoConfiguration = (): LoggerOptions => {
  let configuration: LoggerOptions = {
    level: IS_PRODUCTION ? 'info' : 'debug',
    timestamp: stdTimeFunctions.isoTime
  }

  if (!IS_PRODUCTION) {
    configuration = {
      ...configuration,
      transport: {
        targets: [pinoPrettyTransport]
      }
    }
  }

  return configuration
}

const createLogger = (): Logger => {
  return pino(pinoConfiguration())
}

export const logger = createLogger()
