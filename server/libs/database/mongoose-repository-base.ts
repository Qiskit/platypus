import { Document, Model } from 'mongoose'

import { DataWithPaginationMeta, FindManyPaginatedParams, RepositoryPort } from '../ports/repository-port'
import { NotImplementedException } from '../exceptions/not-implemented-exception'
import { OrmMapperBase } from './orm-mapper-base'

export abstract class MongooseRepositoryBase<Entity extends Document, EntityProps, Domain>
implements RepositoryPort<Entity, EntityProps, Domain> {
  protected EntityModel: Model<Entity>

  protected mapper: OrmMapperBase<Entity, Domain>

  constructor (entityModel: Model<Entity>, mapper: OrmMapperBase<Entity, Domain>) {
    this.EntityModel = entityModel
    this.mapper = mapper
  }

  async save (data: Domain): Promise<Domain> {
    this.mapper.toOrmEntity(data)
    const document = new this.EntityModel(data)
    // TODO we should handle exceptions from save too
    await document.save()
    return this.mapper.toDomainEntity(document)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, require-await
  async findOneByIdOrThrow (id: string): Promise<Entity> {
    throw new NotImplementedException()
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, require-await
  async findManyPaginated (options: FindManyPaginatedParams<EntityProps>): Promise<DataWithPaginationMeta<Entity[]>> {
    throw new NotImplementedException()
  }
}
