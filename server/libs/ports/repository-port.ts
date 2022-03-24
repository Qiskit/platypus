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

export interface FindById<Domain> {
    findById(id: string): Promise<Domain | null>;
}

export interface Save<Domain> {
    save(entity: Domain): Promise<Domain>;
}

export interface Update<Domain> {
    update(id:string, entity: Partial<Domain>): Promise<Domain | null>;
}

export interface RepositoryPort<QueryParams, Domain>
  extends Save<Domain>,
    FindById<Domain>,
    FindManyPaginated<Domain, QueryParams>,
    Update<Domain> {}
