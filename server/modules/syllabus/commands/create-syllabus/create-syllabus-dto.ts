import { IsArray, IsEmail, IsString, MaxLength, IsNotEmpty, IsOptional, validateOrReject } from 'class-validator'
import { Syllabus } from '../../domain/syllabus'
import { SyllabusSection } from '../../domain/syllabus-section'
import { SyllabusCode, generate } from '../../domain/syllabus-code'

export type CreateSyllabus = Omit<Syllabus, 'id'>

export class CreateSyllabusDto implements CreateSyllabus {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  readonly name!: string

  @MaxLength(64)
  @IsString()
  @IsNotEmpty()
  readonly instructor!: string

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  readonly location!: string

  @MaxLength(255)
  @IsString()
  @IsOptional()
  readonly institution?: string

  @IsString()
  @IsNotEmpty()
  readonly officeHours!: string

  @IsString()
  @IsNotEmpty()
  readonly classHours!: string

  @MaxLength(64)
  @IsEmail()
  @IsNotEmpty()
  readonly email!: string

  @IsString()
  @IsNotEmpty()
  readonly descriptionHtml!: string

  @IsArray()
  @IsNotEmpty()
  readonly sections!: SyllabusSection[]

  @IsArray()
  @IsNotEmpty()
  readonly owners!: string[]

  // This field is generated in the constructor and can be modified in the service
  code?: SyllabusCode

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
    owners
  }: CreateSyllabus) {
    this.name = name
    this.instructor = instructor
    this.location = location
    this.institution = institution
    this.officeHours = officeHours
    this.classHours = classHours
    this.email = email
    this.descriptionHtml = descriptionHtml
    this.sections = sections
    this.owners = owners
    this.code = generate()
  }
}

export class CreateSyllabusHttpRequest extends CreateSyllabusDto implements CreateSyllabus {
  validate () {
    return validateOrReject(this)
  }
}
