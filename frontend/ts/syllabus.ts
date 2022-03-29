
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

export const getActiveSyllabus = (): Syllabus | undefined => {
  const jsonText: string = document.getElementById('syllabus')?.textContent || ''
  if (jsonText.startsWith('SYLLABUS.NOT_FOUND')) {
    return undefined
  }
  
  return JSON.parse(jsonText) as Syllabus
}
