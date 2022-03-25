
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
  unitList: Unit[],
}

export interface Unit {
  name: string,
  url: string,
  id: string
}