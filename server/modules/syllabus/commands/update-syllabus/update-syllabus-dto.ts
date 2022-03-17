import { validateOrReject } from 'class-validator'

import { Syllabus } from '../../domain/syllabus'
import { SyllabusSection } from '../../domain/syllabus-section'

export type UpdateSyllabus = Syllabus

export class UpdateSyllabusDto implements Syllabus {
  readonly id?: string

  readonly name: string

  readonly instructor: string

  readonly location: string

  readonly institution?: string

  readonly officeHours: string

  readonly classHours: string

  readonly email: string

  readonly descriptionHtml: string

  readonly sections: SyllabusSection[]

  readonly additionalHtml?: string

  readonly owners: string[]

  code?: string

  constructor ({
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
    owners,
    code
  }: UpdateSyllabus) {
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
    this.code = code
  }
}

export class UpdateSyllabusHttpRequest extends UpdateSyllabusDto implements UpdateSyllabus {
  validate () {
    return validateOrReject(this)
  }
}
