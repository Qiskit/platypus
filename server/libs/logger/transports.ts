import { IS_PRODUCTION } from '../../configuration'

export const pinoPrettyTransport = {
  target: 'pino-pretty',
  level: IS_PRODUCTION ? 'info' : 'debug',
  options: {
    colorize: true
  }
}
