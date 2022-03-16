import { FilterQuery, QueryOptions } from 'mongoose'

import { MongooseRepositoryBase } from '../../../libs/database/mongoose-repository-base'
import { NotImplementedException } from '../../../libs/exceptions/not-implemented-exception'
import { FindManyPaginatedParams } from '../../../libs/ports/repository-port'

import { Syllabus } from '../domain/syllabus'
import { SyllabusQueryParams } from '../domain/syllabus-query-params'
import { SyllabusDocument } from '../database/syllabus-entity'
import { SyllabusRepositoryPort } from './syllabus-repository-port'

export class SyllabusRepository
  extends MongooseRepositoryBase<SyllabusDocument, SyllabusQueryParams, Syllabus>
  implements SyllabusRepositoryPort {
  processQueryParams (queryParams: FindManyPaginatedParams<SyllabusQueryParams>): { filter: FilterQuery<SyllabusQueryParams>, options: QueryOptions } {
    return {
      filter: {
        _id: queryParams.params?.id,
        owners: queryParams.params?.owner
      },
      options: {
        limit: queryParams.pagination?.limit,
        skip: queryParams.pagination?.skip
      }
    }
  }

  async findOneByIdAndOwner (search: FindManyPaginatedParams<SyllabusQueryParams>): Promise<Syllabus | null> {
    const { filter } = this.processQueryParams(search)

    const document = await this.EntityModel.findOne(filter)

    if (document) {
      return this.mapper.toDomainEntity(document)
    }
    return document
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findOneByCode (code: string): Promise<Syllabus | null> {
    throw new NotImplementedException()
  }
}
