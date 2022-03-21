import { Document, Model, FilterQuery, QueryOptions } from 'mongoose'

import { DataWithPaginationMeta, FindManyPaginatedParams, RepositoryPort } from '../ports/repository-port'
import { OrmMapperBase } from './orm-mapper-base'

export const DEFAULT_PAGINATION_LIMIT = 10

export abstract class MongooseRepositoryBase<Entity extends Document, QueryParams, Domain>
implements RepositoryPort<QueryParams, Domain> {
  protected EntityModel: Model<Entity>

  protected mapper: OrmMapperBase<Entity, Domain>

  constructor (entityModel: Model<Entity>, mapper: OrmMapperBase<Entity, Domain>) {
    this.EntityModel = entityModel
    this.mapper = mapper
  }

  abstract processQueryParams (queryParams: FindManyPaginatedParams<QueryParams>): { filter: FilterQuery<Entity>, options: QueryOptions }

  async save (data: Domain): Promise<Domain> {
    this.mapper.toOrmEntity(data)
    const document = new this.EntityModel(data)
    // TODO we should handle exceptions from save too
    await document.save()
    return this.mapper.toDomainEntity(document)
  }

  async findById (id: string): Promise<Domain | null> {
    const document = await this.EntityModel.findById(id)

    if (document) {
      return this.mapper.toDomainEntity(document)
    }
    return document
  }

  async findManyPaginated (search: FindManyPaginatedParams<QueryParams>): Promise<DataWithPaginationMeta<Domain[]>> {
    const { filter, options } = this.processQueryParams(search)

    // TODO: here we can call to populate to retrieve relations
    const documents = await this.EntityModel.find(filter, null, options)
    const total = await this.EntityModel.count(filter)

    const syllabi = documents.map(document => this.mapper.toDomainEntity(document))
    const limit = options.limit || DEFAULT_PAGINATION_LIMIT
    const skip = options.skip || 0
    return {
      data: syllabi,
      count: total,
      limit,
      page: skip / limit
    }
  }
}
