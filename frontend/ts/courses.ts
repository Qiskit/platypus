import { getUserData } from './storage'

interface Section {
  title: string,
  id: string,
  uuid: string,
  url: string,
  pageUrl: string,
  progress: number
}

interface Course {
  title: string,
  url: string,
  id: string
  type: string,
  sections: Section[]
}

let promise: Promise<Course[]> | undefined

const getCourseList = () : Promise<Course[]> => {
  if (!promise) {
    promise = fetch('/courseList/').then((res) => {
      return res.json().then((courses: Course[]) => {
        assignProgressToCourses(courses)
        return courses
      })
    })
  }
  return promise
}

const assignProgressToCourses = (courses: Course[]) => {
  const userData = getUserData()
  courses.forEach((course) => {
    course.sections.forEach((section) => {
      section.progress = (userData?.[course.id]?.[section.id]?.progress || 0) / 100
    })
  })
}

export {
  getCourseList
}

export type {
  Section,
  Course
}
