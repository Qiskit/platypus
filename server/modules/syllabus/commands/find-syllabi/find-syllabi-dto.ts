import { SyllabusQueryParams } from '../../domain/syllabus-query-params'

import { FindManyPaginatedParams, PaginationMeta } from '../../../../libs/ports/repository-port'

export class SyllabusQueryParamsDto implements FindManyPaginatedParams<SyllabusQueryParams> {
  readonly params: SyllabusQueryParams

  readonly pagination: PaginationMeta

  constructor ({ owner, limit, page }: SyllabusQueryParams) {
    this.params = { owner }

    // Pagination
    const defaultLimit = limit || 10
    const defaultPage = page || 0
    this.pagination = {
      limit: defaultLimit,
      skip: defaultPage * defaultLimit
    }
  }
}

export class SyllabusQueryParamsHttpRequest extends SyllabusQueryParamsDto implements FindManyPaginatedParams<SyllabusQueryParams> {}
