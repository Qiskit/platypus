import { Document, Model } from 'mongoose'

import { OrmMapperBase } from './orm-mapper-base'
import { DataWithPaginationMeta, FindManyPaginatedParams, RepositoryPort } from '../ports/repository-port'
import { NotImplementedException } from '../exceptions/not-implemented-exception'

export abstract class MongooseRepositoryBase<Entity extends Document, EntityProps, Domain> 
    implements RepositoryPort<Entity, EntityProps, Domain>{

    protected model: Model<Entity>

    protected mapper: OrmMapperBase<Entity, Domain>

    constructor(model: Model<Entity>, mapper: OrmMapperBase<Entity, Domain>) {
        this.model = model
        this.mapper = mapper
    }

    async save(data: Domain): Promise<Domain> {
        this.mapper.toOrmEntity(data)
        const document = new this.model(data)
        document.save()
        return this.mapper.toDomainEntity(document)
    }

    async findOneByIdOrThrow(id: string): Promise<Entity> {
        throw new NotImplementedException()
    }

    async findManyPaginated(options: FindManyPaginatedParams<EntityProps>): Promise<DataWithPaginationMeta<Entity[]>> {
        throw new NotImplementedException()
    }
}
