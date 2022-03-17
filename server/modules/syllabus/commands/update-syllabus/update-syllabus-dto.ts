import { IsArray, IsNotEmpty, IsOptional, IsString, MaxLength, validateOrReject } from 'class-validator'

import { Syllabus } from '../../domain/syllabus'
import { SyllabusSection } from '../../domain/syllabus-section'

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

  @IsString()
  @IsOptional()
  readonly descriptionHtml: string

  @IsArray()
  @IsOptional()
  readonly sections: SyllabusSection[]

  @IsString()
  @IsOptional()
  readonly additionalHtml?: string

  @IsArray()
  @IsOptional()
  readonly owners: string[]

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
      descriptionHtml,
      sections,
      additionalHtml,
      owners
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
    this.descriptionHtml = descriptionHtml
    this.sections = sections
    this.additionalHtml = additionalHtml
    this.owners = owners
  }
}

export class UpdateSyllabusHttpRequest extends UpdateSyllabusDto implements UpdateSyllabus {
  validate () {
    return validateOrReject(this)
  }
}
