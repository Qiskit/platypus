import { SyllabusQueryParams } from '../../domain/syllabus-query-params'
import { DEFAULT_PAGINATION_LIMIT } from '../../../../libs/database/mongoose-repository-base'

import { FindManyPaginatedParams, PaginationMeta } from '../../../../libs/ports/repository-port'

export class SyllabusQueryParamsDto implements FindManyPaginatedParams<SyllabusQueryParams> {
  readonly params: SyllabusQueryParams

  readonly pagination: PaginationMeta

  constructor ({ owner, limit, page }: SyllabusQueryParams) {
    this.params = { owner }

    // Pagination
    const defaultLimit = limit || DEFAULT_PAGINATION_LIMIT
    const defaultPage = page || 0
    this.pagination = {
      limit: defaultLimit,
      skip: defaultPage * defaultLimit
    }
  }
}

export class SyllabusQueryParamsHttpRequest extends SyllabusQueryParamsDto implements FindManyPaginatedParams<SyllabusQueryParams> {}
