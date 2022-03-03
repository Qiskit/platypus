import { Document, Model } from 'mongoose'

import { DataWithPaginationMeta, FindManyPaginatedParams, RepositoryPort } from '../ports/repository-port'
import { NotImplementedException } from '../exceptions/not-implemented-exception'

export abstract class MongooseRepositoryBase<Entity extends Document, EntityProps> 
    implements RepositoryPort<Entity, EntityProps>{

    protected model: Model<Entity>

    constructor(model: Model<Entity>) {
        this.model = model
    }

    async save(document: Entity): Promise<Entity> {
        return document.save()
    }

    async findOneByIdOrThrow(id: string): Promise<Entity> {
        throw new NotImplementedException()
    }

    async findManyPaginated(options: FindManyPaginatedParams<EntityProps>): Promise<DataWithPaginationMeta<Entity[]>> {
        throw new NotImplementedException()
    }
}
