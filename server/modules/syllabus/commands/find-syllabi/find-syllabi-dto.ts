export interface SyllabusQueryParams {
  owner: string
}

export class SyllabusQueryParamsDto implements SyllabusQueryParams {
  readonly owner: string

  constructor ({ owner }: SyllabusQueryParams) {
    this.owner = owner
  }
}

export class SyllabusQueryParamsHttpRequest extends SyllabusQueryParamsDto implements SyllabusQueryParams {}
