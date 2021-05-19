import './wc/block/block'

import { initNotations } from './ts/notations'
import { initLeftSidebar } from './ts/leftsidebar'
import { initAnalytics, trackClickEvent, trackPage } from './plugins/segmentAnalytics'


declare global {
  interface Window {
    textbook: Textbook,
    textbookAnalytics: any
  }
}

interface Textbook {
  runAfterDOMLoaded: any,
  trackClickEvent?: any,
  courseId?: string,
  sectionId?: string
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

window.textbook = textbook

textbook.runAfterDOMLoaded(() => {
  // hold courseId & sectionId
  const xcourse = document.getElementsByTagName('x-course')[0]
  textbook.courseId = xcourse.id
  textbook.sectionId = xcourse.getAttribute('data-section')

  initLeftSidebar()
  initNotations()

  // set up & trigger segment
  initAnalytics(window.textbookAnalytics.key, window.textbookAnalytics.url)
  textbook.trackClickEvent = trackClickEvent
  trackPage(`${textbook.courseId}/${textbook.sectionId}`)
})
