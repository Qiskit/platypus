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
    const filter = {
      user: queryParams.params?.user
    }

    return {
      filter: pickBy(filter, param => param !== undefined),
      options: {}
    }
  }

  async findOneByUser (search: FindManyPaginatedParams<QiskitUserQueryParams>): Promise<QiskitUser | null> {
    const { filter } = this.processQueryParams(search)

    const document = await this.EntityModel.findOne(filter)

    if (!document) {
      return null
    }
    return this.mapper.toDomainEntity(document)
  }

  async updateOrCreateQiskitUserFilteredByUser (user: string, data: Partial<QiskitUser>): Promise<QiskitUser> {
    const document = await this.EntityModel.findOneAndUpdate({ user }, data, { new: true, upsert: true })

    return this.mapper.toDomainEntity(document)
  }
}
