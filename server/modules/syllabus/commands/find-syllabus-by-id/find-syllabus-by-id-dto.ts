
import { DEFAULT_PAGINATION_LIMIT } from '../../../../libs/database/mongoose-repository-base'
import { FindManyPaginatedParams, PaginationMeta } from '../../../../libs/ports/repository-port'

import { SyllabusQueryParams } from '../../domain/syllabus-query-params'

export class FindSyllabusByIdDto implements FindManyPaginatedParams<SyllabusQueryParams> {
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

export class FindSyllabusByIdHttpRequest extends FindSyllabusByIdDto implements FindManyPaginatedParams<SyllabusQueryParams> {}
