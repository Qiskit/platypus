import { mergeJson } from './utilities'

const STORAGE_KEY = 'qiskit/textbook/course'

interface ProgressData {
  progressData: {[x: string]: any}
}

declare global {
  interface Window extends ProgressData {}
}

const getUserData = function (): {[x: string]: any} {
  let userData = {}
  try {
    const userDataString = window.localStorage.getItem(STORAGE_KEY)
    userData = userDataString ? JSON.parse(userDataString) : {}
  } catch (e) {
    console.error(e)
  }
  return userData
}

const storeUserData = function (data: {[x: string]: any}): boolean {
  try {
    const userData = getUserData()
    let updatedUserData = mergeJson(userData, data)
    const userDataString = JSON.stringify(updatedUserData)
    window.localStorage.setItem(STORAGE_KEY, userDataString)
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

const saveProgressData = function (course: XCourse, progressData: SectionProgress) {
  const savedProgressData = getUserData()?.[course.id]?.[course.section] || {}
  const updatedProgressData = mergeJson(savedProgressData, progressData)

  let scores = 0
  const steps = updatedProgressData?.steps || {}
  for (let s in steps) {
    scores += steps[s].scores.length
  }
  const progress = scores / (course.goals || 0)
  if (!isNaN(progress)) {
    updatedProgressData.progress = parseFloat(progress.toFixed(2))
    updatedProgressData.completed = progress > 0.99
  
    storeUserData({
      [course.id]: {
        [course.section]: updatedProgressData
      }
    })
  }
}

const getProgressData = function () {
  let pathname = window.location.pathname
  pathname = pathname.startsWith('/') ? pathname.substring(1) : pathname
  const paths = pathname.split('/')
  let savedProgressData = {}

  if (paths.length === 3 && paths[0] === 'course') {
    const courseId = paths[1]
    const sectionId = paths[2]
    savedProgressData = getUserData()?.[courseId]?.[sectionId] || savedProgressData
  }

  return savedProgressData
}

const renderProgessData = function (courseId: string) {
  const courseSectionsData = getUserData()?.[courseId] || {}
  for (let sectionId in courseSectionsData) {
    const sectionProgressIndicator = document.querySelector(`[data-section-id="${sectionId}"] x-progress`)
    if (sectionProgressIndicator) {
      sectionProgressIndicator.setAttribute('p', courseSectionsData[sectionId]?.progress || 0)
    }
  }
}

const storeProgressLocally = function (course: XCourse) {
  console.debug(`storing progress in localStorage for ${course.id}/${course.section}`)

  renderProgessData(course.id)

  const _origfetch = window.fetch
  window.fetch = async (url: RequestInfo, options) => {
    if (typeof(url) === 'string' && url.startsWith(`/course/${course.id}/${course.section}`)) {
      if (options?.method === 'POST' && typeof(options.body) === 'string') {
        try {
          let formData = decodeURIComponent(options.body)
          if (formData.startsWith('data=')) {
            // strip the 'data=' prefix to get to the formData (i.e., progress info) being submitted
            formData = formData.substring(5)
          }

          const progress = JSON.parse(formData) as SectionProgress
          saveProgressData(course, progress)
        } catch (e) {
          console.error('Failed to process fetch options:', e)
        }
      }
    }

    return await _origfetch(url, options)
  }
}

export {
  getProgressData,
  storeProgressLocally,
  getUserData,
  storeUserData
}
