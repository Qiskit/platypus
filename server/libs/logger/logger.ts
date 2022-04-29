import { pino, stdTimeFunctions } from 'pino'
import type { Logger, LoggerOptions } from 'pino'

import { pinoPrettyTransport } from './transports'

const isProd = process.env.NODE_ENV === 'production'

const pinoConfiguration = (): LoggerOptions => {
  let configuration: LoggerOptions = {
    level: isProd ? 'info' : 'debug',
    timestamp: stdTimeFunctions.isoTime
  }

  if (!isProd) {
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
