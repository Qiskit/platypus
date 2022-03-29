
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

export const getActiveSyllabus = (): Syllabus => {
  const jsonText : string = document.getElementById('syllabus')?.textContent || ''
  return JSON.parse(jsonText) as Syllabus
}
