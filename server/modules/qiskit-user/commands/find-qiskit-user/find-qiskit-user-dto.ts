import { DEFAULT_PAGINATION_LIMIT } from '../../../../libs/database/mongoose-repository-base'

import { FindManyPaginatedParams, PaginationMeta } from '../../../../libs/ports/repository-port'

import { QiskitUserQueryParams } from '../../domain/qiskit-user-query-params'

export class FindQiskitUserByUserDto implements FindManyPaginatedParams<QiskitUserQueryParams> {
  readonly params: QiskitUserQueryParams

  readonly pagination: PaginationMeta

  constructor ({ user }: QiskitUserQueryParams) {
    this.params = { user }

    // The pagination for this use-case is not needed so it is populated with default values
    this.pagination = {
      limit: DEFAULT_PAGINATION_LIMIT,
      skip: 0
    }
  }
}

export class FindQiskitUserByUserHttpRequest extends FindQiskitUserByUserDto implements FindManyPaginatedParams<QiskitUserQueryParams> {}
