import { IsArray, IsNotEmpty, IsOptional, IsString, MaxLength, validateOrReject } from 'class-validator'

import { Syllabus } from '../../domain/syllabus'
import { SyllabusCourse } from '../../domain/syllabus-course'

export type UpdateSyllabus = Omit<Syllabus, 'id' | 'code'>

export class UpdateSyllabusDto implements Syllabus {
  @MaxLength(255)
  @IsString()
  @IsOptional()
  readonly name: string

  @MaxLength(64)
  @IsString()
  @IsOptional()
  readonly instructor: string

  @MaxLength(255)
  @IsString()
  @IsOptional()
  readonly location: string

  @MaxLength(255)
  @IsString()
  @IsOptional()
  readonly institution?: string

  @IsString()
  @IsOptional()
  readonly officeHours: string

  @IsString()
  @IsOptional()
  readonly classHours: string

  @MaxLength(64)
  @IsString()
  @IsOptional()
  readonly email: string

  @IsArray()
  @IsOptional()
  readonly courseList: SyllabusCourse[]

  @IsArray()
  @IsOptional()
  readonly ownerList: string[]

  @IsString()
  @IsNotEmpty()
  readonly id: string

  @IsString()
  @IsNotEmpty()
  readonly owner: string

  constructor (
    id: string,
    owner: string,
    {
      name,
      instructor,
      location,
      institution,
      officeHours,
      classHours,
      email,
      courseList,
      ownerList
    }: UpdateSyllabus) {
    this.id = id
    this.owner = owner
    this.name = name
    this.instructor = instructor
    this.location = location
    this.institution = institution
    this.officeHours = officeHours
    this.classHours = classHours
    this.email = email
    this.courseList = courseList
    this.ownerList = ownerList
  }
}

export class UpdateSyllabusHttpRequest extends UpdateSyllabusDto implements UpdateSyllabus {
  validate () {
    return validateOrReject(this)
  }
}
