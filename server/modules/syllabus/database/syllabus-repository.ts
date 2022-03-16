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
  processQueryParam (queryParams: FindManyPaginatedParams<SyllabusQueryParams>): { filter: FilterQuery<SyllabusQueryParams>, options: QueryOptions } {
    return {
      filter: {
        ownners: queryParams.params?.owner
      },
      options: {
        limit: queryParams.pagination?.limit,
        skip: queryParams.pagination?.skip
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findOneByCode (code: string): Promise<SyllabusDocument> {
    throw new NotImplementedException()
  }
}
