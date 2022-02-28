import { DataWithPaginationMeta, FindManyPaginatedParams, RepositoryPort } from '../ports/repository-port'
import { NotImplementedException } from '../exceptions/not-implemented-exception'

export abstract class MongooseRepositoryBase<Entity, EntityProps> 
    implements RepositoryPort<Entity, EntityProps>{

    async save(entity: Entity): Promise<Entity> {
        throw new NotImplementedException()
    }

    async findOneByIdOrThrow(id: string): Promise<Entity> {
        throw new NotImplementedException()
    }

    async findManyPaginated(options: FindManyPaginatedParams<EntityProps>): Promise<DataWithPaginationMeta<Entity[]>> {
        throw new NotImplementedException()
    }
}
