import { Config, SectionProgressData } from '@mathigon/studio/server/interfaces'

export interface Progression {
  [key: string]: { // course
      [key: string]: SectionProgressData // section
  };
}

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
  id: string,
  url: string,
  pageUrl: string
}

export interface TocCourse {
  title: string,
  id: string,
  url: string,
  type?: string,
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

export interface NotationsLocales {
  [x: string]: NotationsMap
}

export interface Subsection {
  title: string,
  id: string,
  subsections?: [Subsection]
}
