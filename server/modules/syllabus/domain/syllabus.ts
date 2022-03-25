import { SyllabusCourse } from './syllabus-course'
import type { SyllabusCode } from './syllabus-code'

export interface Syllabus {
    id?: string,
    name: string,
    instructor: string,
    location: string,
    institution?: string,
    officeHours: string,
    classHours: string,
    email: string,
    courseList: SyllabusCourse[]
    code?: SyllabusCode,
    ownerList: string[],
}
