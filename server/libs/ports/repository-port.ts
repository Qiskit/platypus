// TODO: implement orderBy when required
// export interface OrderBy {
//     [key: number]: -1 | 1;
// }

export interface PaginationMeta {
    skip: number;
    limit: number;
}

export interface FindManyPaginatedParams<QueryParams> {
    params: QueryParams;
    pagination: PaginationMeta;
    // orderBy?: OrderBy;
}

export interface DataWithPaginationMeta<T> {
    data: T;
    count: number;
    limit: number;
    page: number;
}

export interface FindManyPaginated<Domain, QueryParams> {
    findManyPaginated(
      search: FindManyPaginatedParams<QueryParams>,
    ): Promise<DataWithPaginationMeta<Domain[]>>;
}

export interface FindOneById<Entity> {
    findOneByIdOrThrow(id: string): Promise<Entity>;
}

export interface Save<Domain> {
    save(entity: Domain): Promise<Domain>;
}

export interface RepositoryPort<Entity, QueryParams, Domain>
  extends Save<Domain>,
    FindOneById<Entity>,
    FindManyPaginated<Domain, QueryParams> {
    // TODO: here we are going to need to include more generic methods
}
