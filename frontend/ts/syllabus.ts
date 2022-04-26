
export type UnitUUID = string

export type SyllabusCode = string

export interface SyllabusCourse {
  title: string,
  description: string,
  unitList: UnitUUID[],
}

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

export const getActiveSyllabus = (): Syllabus | undefined => {
  const jsonText: string = document.getElementById('syllabus')?.textContent || ''

  try {
    return JSON.parse(jsonText) as Syllabus
  } catch {
    return undefined
  }
}

export const emptySyllabus = (): Syllabus => ({
  name: '',
  instructor: '',
  location: '',
  institution: '',
  officeHours: '',
  classHours: '',
  email: '',
  courseList: [
    {
      title: '',
      description: '',
      unitList: []
    }
  ]
})
