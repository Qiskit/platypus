import './wc/block/block'

import { initIndexHighlight } from './ts/indexhighlighter'
import { initNotations } from './ts/notations'
import { initLeftSidebar } from './ts/leftsidebar'
import { getProgressData, storeProgressLocally } from './ts/storage'
import { initAnalytics, trackClickEvent, trackPage, trackPerformedSearch } from './plugins/segmentAnalytics'


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
  course?: XCourse
}

const runAfterDOMLoaded = function (cb: EventListenerOrEventListenerObject|CallableFunction) {
  if (document.readyState != 'loading') {
    (cb as CallableFunction)()
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', cb as EventListenerOrEventListenerObject)
  }
}

const textbook: Textbook = {
  runAfterDOMLoaded
}

window.progressData = getProgressData()
window.textbook = textbook

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
  initNotations()
  initIndexHighlight()

  // set up & trigger segment
  initAnalytics(window.textbookAnalytics.key, window.textbookAnalytics.url)
  textbook.trackClickEvent = trackClickEvent
  textbook.trackPerformedSearch = trackPerformedSearch
  trackPage(window.location.pathname)
})
