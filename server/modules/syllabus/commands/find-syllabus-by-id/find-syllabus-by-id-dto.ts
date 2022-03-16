import { IsNotEmpty, IsString, validateOrReject } from 'class-validator'

export interface FindSyllabusById {
  id: string,
  owner: string
}

export class FindSyllabusByIdDto implements FindSyllabusById {
  @IsString()
  @IsNotEmpty()
  readonly id!: string

  @IsString()
  @IsNotEmpty()
  readonly owner!: string

  constructor ({ id, owner }: FindSyllabusById) {
    this.id = id
    this.owner = owner
  }
}

export class FindSyllabusByIdHttpRequest extends FindSyllabusByIdDto implements FindSyllabusById {
  validate () {
    return validateOrReject(this)
  }
}
