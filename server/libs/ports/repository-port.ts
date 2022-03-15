export interface OrderBy {
    [key: number]: -1 | 1;
}

export interface PaginationMeta {
    skip?: number;
    limit?: number;
    page?: number;
}

export interface FindManyPaginatedParams<EntityProps> {
    params?: EntityProps;
    pagination?: PaginationMeta;
    orderBy?: OrderBy;
}

export interface DataWithPaginationMeta<T> {
    data: T;
    count: number;
    limit?: number;
    page?: number;
}

export interface FindManyPaginated<Entity, EntityProps> {
    findManyPaginated(
      options: FindManyPaginatedParams<EntityProps>,
    ): Promise<DataWithPaginationMeta<Entity[]>>;
}

export interface FindOneById<Entity> {
    findOneByIdOrThrow(id: string): Promise<Entity>;
}

export interface Save<Domain> {
    save(entity: Domain): Promise<Domain>;
}

export interface RepositoryPort<Entity, EntityProps, Domain>
  extends Save<Domain>,
    FindOneById<Entity>,
    FindManyPaginated<Entity, EntityProps> {
    // TODO: here we are going to need to include more generic methods
}
