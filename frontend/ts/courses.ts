import { load as loadYAML } from 'js-yaml'
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
let courseList: Course[] | undefined

const getCourseList = () : Course[] => {
  if (!courseList) {
    courseList = (loadYAML(document.getElementById('toc')?.textContent || '') || []) as [Course]
    courseList.forEach((course) => {
      course.id = course.url.startsWith('/') ? course.url.substring(1) : course.url
      course.sections.forEach((section) => {
        section.url = `/course/${course.id}/${section.id}`
        section.progress = getUserData()?.[course.id]?.[section.id]?.progress
      })
    })
  }
  return courseList || []
}

const getLearningPathCourses = (): Course[] => {
  const allCourses = getCourseList()
  return allCourses.filter(course => course.type === 'learning-path')
}

export {
  getCourseList,
  getLearningPathCourses
}

export type {
  Chapter,
  Course
}
