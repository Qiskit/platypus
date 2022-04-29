const isProd = process.env.NODE_ENV === 'production'

export const pinoPrettyTransport = {
  target: 'pino-pretty',
  level: isProd ? 'info' : 'debug',
  options: {
    colorize: true
  }
}
