import pickBy from 'lodash/pickBy'

import { OrmMapperBase } from '../../../libs/database/orm-mapper-base'
import { QiskitUser as QiskitUserDomain } from '../domain/qiskit-user'
import { QiskitUserDocument, QiskitUser as QiskitUserOrm } from './qiskit-user-entity'

export class QiskitUserMapper implements OrmMapperBase<QiskitUserDocument, QiskitUserDomain> {
  toOrmEntity (data: QiskitUserDomain): QiskitUserDocument {
    const fields = {
      id: data.id,
      apiToken: data.apiToken,
      user: data.user
    }
    const cleanedFields = pickBy(fields, field => field !== undefined)
    return new QiskitUserOrm(cleanedFields)
  }

  toDomainEntity (document: QiskitUserDocument): QiskitUserDomain {
    return {
      id: document.id,
      apiToken: document.apiToken,
      user: document.user.toString()
    }
  }
}
