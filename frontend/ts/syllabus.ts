
export interface Syllabus {
  id?: string,
  code?: SyllabusCode,
  name: string,
  instructor: string,
  location: string,
  institution: string,
  officeHours: string,
  classHours: string,
  email: string,
  courseList: SyllabusCourse[]
}

export type SyllabusCode = string

export interface SyllabusCourse {
  title: string,
  description: string,
  unitList: UnitUUID[],
}

export type UnitUUID = string

let promise: Promise<Syllabus[]> | undefined

interface fetchResult {
  data: Syllabus[],
  count: number,
  limit: number,
  page: number
}

export const getSyllabi = () : Promise<Syllabus[]> => {
  if (!promise) {
    promise = fetch('/syllabus').then((res) => {
      return res.json().then((jsonResult: fetchResult) => {
        return jsonResult.data
      })
    })
  }
  return promise
}
