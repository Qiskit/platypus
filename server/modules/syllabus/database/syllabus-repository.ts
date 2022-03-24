import { FilterQuery, QueryOptions } from 'mongoose'
import pickBy from 'lodash/pickBy'

import { MongooseRepositoryBase } from '../../../libs/database/mongoose-repository-base'
import { FindManyPaginatedParams } from '../../../libs/ports/repository-port'

import { Syllabus } from '../domain/syllabus'
import { SyllabusQueryParams } from '../domain/syllabus-query-params'
import { SyllabusDocument } from '../database/syllabus-entity'
import { SyllabusRepositoryPort } from './syllabus-repository-port'

export class SyllabusRepository
  extends MongooseRepositoryBase<SyllabusDocument, SyllabusQueryParams, Syllabus>
  implements SyllabusRepositoryPort {
  processQueryParams (queryParams: FindManyPaginatedParams<SyllabusQueryParams>): { filter: FilterQuery<SyllabusQueryParams>, options: QueryOptions } {
    const filter = {
      code: queryParams.params?.code,
      owners: queryParams.params?.owner
    }

    return {
      filter: pickBy(filter, param => param !== undefined), // Mongoose filter by undefined so we clean first the filters
      options: {
        limit: queryParams.pagination?.limit,
        skip: queryParams.pagination?.skip
      }
    }
  }

  async findOneByCode (search: FindManyPaginatedParams<SyllabusQueryParams>): Promise<Syllabus | null> {
    const { filter } = this.processQueryParams(search)

    const document = await this.EntityModel.findOne(filter)

    if (!document) {
      return null
    }
    return this.mapper.toDomainEntity(document)
  }

  async updateSyllabusFilteredByOwner (id: string, owner: string, data: Partial<Syllabus>): Promise<Syllabus | null> {
    const document = await this.EntityModel.findOneAndUpdate({ _id: id, owners: owner }, data, { new: true })

    if (!document) {
      return null
    }
    return this.mapper.toDomainEntity(document)
  }
}
