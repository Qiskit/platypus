import { FilterQuery, QueryOptions } from 'mongoose'
import pickBy from 'lodash/pickBy'

import { MongooseRepositoryBase } from '../../../libs/database/mongoose-repository-base'
import { FindManyPaginatedParams } from '../../../libs/ports/repository-port'

import { QiskitUser } from '../domain/qiskit-user'
import { QiskitUserQueryParams } from '../domain/qiskit-user-query-params'
import { QiskitUserDocument } from '../database/qiskit-user-entity'
import { QiskitUserRepositoryPort } from './qiskit-user-repository-port'

export class QiskitUserRepository
  extends MongooseRepositoryBase<QiskitUserDocument, QiskitUserQueryParams, QiskitUser>
  implements QiskitUserRepositoryPort {
  processQueryParams (queryParams: FindManyPaginatedParams<QiskitUserQueryParams>): { filter: FilterQuery<QiskitUserQueryParams>, options: QueryOptions } {
    return {
      filter: pickBy(queryParams, param => param !== undefined),
      options: {}
    }
  }

  async updateOrCreateQiskitUserFilteredByUser (user: string, data: Partial<QiskitUser>): Promise<QiskitUser> {
    const document = await this.EntityModel.findOneAndUpdate({ user }, data, { new: true, upsert: true })

    return this.mapper.toDomainEntity(document)
  }
}
