
import {
  CtaClickedEventSegmentSchema,
  PerformedSearchEventSegmentSchema,
  UpdatedObjectEventSegmentSchema
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
 * @param cta The call to action
 * @param location Location in the UI
 */
function trackClickEvent (cta: string, location: string) {
  const { bluemixAnalytics, digitalData } = window

  if (!bluemixAnalytics || !digitalData) { return }

  const productTitle = getOrFailProductTitle(digitalData)
  const category = getOrFailCategory(digitalData)

  const segmentOptions: CtaClickedEventSegmentSchema = {
    category,
    CTA: cta,
    location,
    productTitle
  }

  bluemixAnalytics.trackEvent('CTA Clicked', segmentOptions)
}

/**
 * Send the information of a "Performed Search" event to Segment.
 * @param context Bluemix Analytics configuration
 * @param uiElement The UI element that was used to trigger this event
 * @param field Search input
 */
function trackPerformedSearch (uiElement: string, field: string) {
  const { bluemixAnalytics, digitalData } = window

  if (!bluemixAnalytics || !digitalData) { return }

  const productTitle = getOrFailProductTitle(digitalData)
  const category = getOrFailCategory(digitalData)

  const eventOptions: PerformedSearchEventSegmentSchema = {
    category,
    productTitle,
    uiElement,
    field
  }

  bluemixAnalytics.trackEvent('Performed Search', eventOptions)
}

/**
 * Send the information of a "Updated Object" event to Segment.
 * @param context Bluemix Analytics configuration
 * @param objectType Type of object that was updated
 * @param object Object that was updated
 */
function trackUpdatedObject (objectType: string, object: string) {
  const { bluemixAnalytics, digitalData } = window

  if (!bluemixAnalytics || !digitalData) { return }

  const productTitle = getOrFailProductTitle(digitalData)
  const category = getOrFailCategory(digitalData)

  const eventOptions: UpdatedObjectEventSegmentSchema = {
    category,
    productTitle,
    object,
    objectType
  }

  bluemixAnalytics.trackEvent('Updated Object', eventOptions)
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
  app.config.globalProperties.$trackPerformedSearch = trackPerformedSearch
  app.config.globalProperties.$trackUpdatedObject = trackUpdatedObject
}

export {
  initAnalytics,
  install,
  trackClickEvent,
  trackPage,
  trackPerformedSearch,
  trackUpdatedObject
}

export type {
  AnalyticsContext
}
