export abstract class OrmMapperBase<T, U> {
    
    abstract toOrmEntity(data: U): T;
    
    abstract toDomainEntity(document: T): U;
}
