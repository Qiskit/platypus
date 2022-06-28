import { IsOptional, IsString, validateOrReject } from 'class-validator'

import { QiskitUser } from '../../domain/qiskit-user'

export type UpdateQiskitUser = Omit<QiskitUser, 'id'>

export class UpdateQiskitUserDto implements UpdateQiskitUser {
  @IsString()
  @IsOptional()
  readonly apiToken?: string

  constructor ({ apiToken }: UpdateQiskitUser) {
    this.apiToken = apiToken
  }
}
