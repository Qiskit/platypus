
import { DEFAULT_PAGINATION_LIMIT } from '../../../../libs/database/mongoose-repository-base'
import { FindManyPaginatedParams, PaginationMeta } from '../../../../libs/ports/repository-port'

import { SyllabusQueryParams } from '../../domain/syllabus-query-params'

export class FindSyllabusByCodeDto implements FindManyPaginatedParams<SyllabusQueryParams> {
  readonly params: SyllabusQueryParams

  readonly pagination: PaginationMeta

  constructor ({ code, owner }: SyllabusQueryParams) {
    this.params = { code, owner }
    this.pagination = {
      limit: DEFAULT_PAGINATION_LIMIT,
      skip: 0
    }
  }
}

export class FindSyllabusByCodeHttpRequest extends FindSyllabusByCodeDto implements FindManyPaginatedParams<SyllabusQueryParams> {}
