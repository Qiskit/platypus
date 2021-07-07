
import {
  CtaClickedEventProperties,
  CtaClickedSegmentTrackProperties,
  SearchedTermSegmentTrackProperties
} from '../constants/segment'

/**
 * Set of configuration objects and flags required by Bluemix Analytics.
 * Main configuration objects are `_analytics`, `bluemixAnalytics` and
 * `digitalData`.
 *
 * See
 * https://github.ibm.com/Bluemix/Bluemix.Analytics/blob/master/webpack.constants.js
 * for default values.
 */
interface AnalyticsContext {
  _analytics?: any
  _analyticsReady?: Promise<Event>
  bluemixAnalytics?: any
  digitalData?: any
}

/**
 * The parameters needed to register a click event.
 */
interface ClickEventParams {
  /** A description of the CTA. */
  action: string
}

interface TextbookAnalytics {
  textbookAnalytics: {
    url: string,
    key: string
  }
}

declare global {
  interface Window extends AnalyticsContext, TextbookAnalytics {}
}

function configureAnalytics (analyticsKey: string) {
  window._analytics = {
    segment_key: analyticsKey,
    coremetrics: false,
    optimizely: false,
    googleAddServices: false,
    fullStory: false,
    autoPageEventSpa: false,
    autoFormEvents: false,
    autoPageView: false
  }

  window.digitalData = {
    page: {
      pageInfo: {
        productTitle: 'IBM Q Experience',
        analytics: {
          category: 'Qiskit.org'
        }
      }
    }
  }
}

function installAnalyticsOnce (analyticsScriptUrl: string = '') {
  window._analyticsReady = window._analyticsReady || new Promise<Event>((resolve, reject) => {
    const script = document.createElement('script')
    script.async = true
    script.src = analyticsScriptUrl
    document.head.appendChild(script)
    script.onload = resolve
    script.onerror = (err) => {
      console.warn('Error loading Bluemix Analytics script:', err)
      reject(err)
    }
  })
}

/**
 * Send a page visitation event to segment.
 * @param title the title meta tag of the page
 */
 function trackPage (title: string) {
  const { bluemixAnalytics, digitalData } = window

  if (!bluemixAnalytics || !digitalData) { return }

  const category = getOrFailCategory(digitalData)
  const productTitle = getOrFailProductTitle(digitalData)
  const routeName = 'project-platypus'

  bluemixAnalytics.pageEvent(category, routeName, {
    navigationType: 'pushState',
    productTitle,
    title
  })
}

/**
 * Send the information of a CTA click event to Segment.
 * @param customProperties Segment click event properties
 */
function trackClickEvent (customProperties: CtaClickedEventProperties) {
  const { bluemixAnalytics, digitalData } = window
  const { cta, location } = customProperties

  if (!bluemixAnalytics || !digitalData) { return }

  const productTitle = getOrFailProductTitle(digitalData)
  const category = getOrFailCategory(digitalData)

  const segmentOptions: CtaClickedSegmentTrackProperties = {
    category,
    CTA: cta,
    location,
    productTitle
  }

  bluemixAnalytics.trackEvent('CTA Clicked', segmentOptions)
}

/**
 * Send the information of an entered search term to Segment.
 * @param searchComponent Name of the search component
 * @param searchTerm Search term
 */
function trackSearchTerm (searchComponent: string, searchTerm: string) {
  const { bluemixAnalytics, digitalData } = window

  if (!bluemixAnalytics || !digitalData) { return }

  const productTitle = getOrFailProductTitle(digitalData)
  const category = getOrFailCategory(digitalData)

  const eventOptions: SearchedTermSegmentTrackProperties = {
    category,
    location: searchComponent,
    productTitle,
    text: searchTerm
  }

  bluemixAnalytics.trackEvent('Searched Term', eventOptions)
}

function getOrFailProductTitle (digitalData: any): string {
  return assertCanGet(
    () => digitalData.page.pageInfo.productTitle,
    '`digitalData.page.pageInfo.productTitle` is missing'
  )
}

function getOrFailCategory (digitalData: any): string {
  return assertCanGet(
    () => digitalData.page.pageInfo.analytics.category,
    '`digitalData.page.pageInfo.analytics.category` is missing'
  )
}

function assertCanGet<T> (getter: () => T, error: string): T {
  let result
  try {
    result = getter()
  } catch (ex) { }
  if (!result) {
    throw new Error(error)
  }
  return result
}

function initAnalytics (key: string, url: string) {
  configureAnalytics(key)
  installAnalyticsOnce(url)
}

function install (app: any, _options: any = {}) {
  initAnalytics(window.textbookAnalytics.key, window.textbookAnalytics.url)
  app.config.globalProperties.$trackClickEvent = trackClickEvent
  app.config.globalProperties.$trackPage = trackPage
  app.config.globalProperties.$trackSearchTerm = trackSearchTerm
}

export {
  initAnalytics,
  install,
  trackClickEvent,
  trackPage,
  trackSearchTerm
}

export type {
  ClickEventParams,
  AnalyticsContext
}
