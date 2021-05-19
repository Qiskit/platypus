import { Config } from '@mathigon/studio/server/interfaces'

export interface AnalyticsEntry {
  url: string,
  key: string
}

export interface Analytics {
  production: AnalyticsEntry,
  development: AnalyticsEntry
}

export interface AnalyticsConfig extends Config {
  analytics: Analytics|AnalyticsEntry
}

export interface TocSection {
  title: string,
  url: string
}

export interface TocCourse {
  title: string,
  url: string,
  'learning-path'?: boolean,
  sections: [TocSection]
}

export interface Notation {
  meaning: string,
  say?: string,
  type?: string
}

export interface NotationsMap {
  [x: string]: Notation
}
