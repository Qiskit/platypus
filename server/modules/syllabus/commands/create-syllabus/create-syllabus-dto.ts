import { IsArray, IsEmail, IsString, MaxLength, IsNotEmpty, IsOptional, validateOrReject } from 'class-validator'
import { Syllabus } from '../../domain/syllabus'
import { SyllabusCourse } from '../../domain/syllabus-course'
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
  @IsOptional()
  readonly officeHours!: string

  @IsString()
  @IsOptional()
  readonly classHours!: string

  @MaxLength(64)
  @IsOptional()
  readonly email!: string

  @IsArray()
  @IsNotEmpty()
  readonly courseList!: SyllabusCourse[]

  @IsArray()
  @IsNotEmpty()
  readonly ownerList!: string[]

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
    courseList,
    ownerList
  }: CreateSyllabus) {
    this.name = name
    this.instructor = instructor
    this.location = location
    this.institution = institution
    this.officeHours = officeHours
    this.classHours = classHours
    this.email = email
    this.courseList = courseList
    this.ownerList = ownerList
    this.code = generate()
  }
}

export class CreateSyllabusHttpRequest extends CreateSyllabusDto implements CreateSyllabus {
  validate () {
    return validateOrReject(this)
  }
}
