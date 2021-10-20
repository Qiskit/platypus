// import { load as loadYAML } from 'js-yaml'
import { getUserData } from './storage'

interface Chapter {
  title: string,
  id: string,
  url: string,
  progress: number
}

interface Course {
  title: string,
  url: string,
  id: string
  type: string,
  sections: Chapter[]
}

let promise: Promise<Course[]> | undefined

const getCourseList = () : Promise<Course[]> => {
  if (!promise) {
    promise = fetch('/courseList/').then(res => res?.json ? res.json() : [])
  }
  return promise
}

export {
  getCourseList
}

export type {
  Chapter,
  Course
}
