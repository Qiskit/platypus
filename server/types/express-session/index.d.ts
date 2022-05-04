export {}

declare module 'express-session' {
  interface SessionData {
    redirectTo: string
  }
}
