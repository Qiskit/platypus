
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
 * @param context the Bluemix Analytics object with the analytics configuration.
 * This is usually `window`.
 * @param routeName a unique name identifying the contents of the route.
 * @param title the title meta tag of the page
 */
function trackPage (context: AnalyticsContext, routeName: string, title: string) {
  const { bluemixAnalytics, digitalData } = context

  if (!bluemixAnalytics || !digitalData) { return }

  const category = getOrFailCategory(digitalData)
  const productTitle = getOrFailProductTitle(digitalData)

  bluemixAnalytics.pageEvent(category, routeName, {
    navigationType: 'pushState',
    productTitle,
    title
  })
}

/**
 * Send the information of a CTA click event to Segment.
 * @param context Bluemix Analytics configuration
 * @param properties Segment click event properties
 */
function trackClickEvent (
  context: AnalyticsContext,
  customProperties: CtaClickedEventProperties
) {
  const { bluemixAnalytics, digitalData } = context
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
 * @param context Bluemix Analytics configuration
 * @param searchComponent Name of the search component
 * @param searchTerm Search term
 */
function trackSearchTerm (
  context: AnalyticsContext,
  searchComponent: string,
  searchTerm: string
) {
  const { bluemixAnalytics, digitalData } = context

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
