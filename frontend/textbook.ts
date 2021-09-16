import './wc/block/block'

import { initIndexHighlight } from './ts/indexhighlighter'
import { initNotations } from './ts/notations'
import { initLeftSidebar, toggleLanguagePicker } from './ts/leftsidebar'
import { getProgressData, storeProgressLocally } from './ts/storage'
import {
  initAnalytics,
  trackClickEvent,
  trackPage,
  trackPerformedSearch,
  trackUpdatedObject
} from './plugins/segmentAnalytics'
import { loadTranslations } from './ts/translations'


declare global {
  interface Window {
    textbook: Textbook,
    textbookAnalytics: any
  }
}

interface Textbook {
  runAfterDOMLoaded: any,
  trackClickEvent?: any,
  trackPerformedSearch?: any,
  trackUpdatedObject?: any,
  course?: XCourse,
  locale: string,
  translations?: {[x:string]: string}
}

const runAfterDOMLoaded = function (cb: EventListenerOrEventListenerObject|CallableFunction) {
  if (document.readyState != 'loading') {
    (cb as CallableFunction)()
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', cb as EventListenerOrEventListenerObject)
  }
}

window.progressData = getProgressData()
window.textbook = Object.assign(window.textbook, {
  runAfterDOMLoaded,
  translations: loadTranslations()
})
const textbook = window.textbook

textbook.runAfterDOMLoaded(() => {
  // hold courseId & sectionId
  const xcourse = document.getElementsByTagName('x-course')[0]
  if (xcourse) {
    textbook.course = {
      id: xcourse.id,
      section: xcourse.getAttribute('data-section') || '',
      goals: +xcourse.getAttribute('data-goals')! || 0
    }

    storeProgressLocally(textbook.course)
  }

  initLeftSidebar()
  toggleLanguagePicker()
  initNotations()
  initIndexHighlight()

  // set up & trigger segment
  initAnalytics(window.textbookAnalytics.key, window.textbookAnalytics.url)
  textbook.trackClickEvent = trackClickEvent
  textbook.trackPerformedSearch = trackPerformedSearch
  textbook.trackUpdatedObject = trackUpdatedObject
  trackPage(window.location.pathname)
})
