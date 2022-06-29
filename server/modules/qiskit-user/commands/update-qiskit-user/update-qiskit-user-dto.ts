import { IsOptional, IsString, validateOrReject } from 'class-validator'

import { QiskitUser } from '../../domain/qiskit-user'

export type UpdateQiskitUser = Omit<QiskitUser, 'id'>

export class UpdateQiskitUserDto implements UpdateQiskitUser {
  @IsString()
  @IsOptional()
  readonly apiToken?: string

  @IsString()
  readonly user: string

  constructor ({ apiToken, user }: UpdateQiskitUser) {
    this.apiToken = apiToken
    this.user = user
  }
}

export class UpdateQiskitUserHttpRequest extends UpdateQiskitUserDto implements UpdateQiskitUser {
  validate () {
    return validateOrReject(this)
  }
}
