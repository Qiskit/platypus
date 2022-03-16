import { FindManyPaginatedParams, RepositoryPort } from '../../../libs/ports/repository-port'
import { Syllabus } from '../domain/syllabus'
import { SyllabusQueryParams } from '../domain/syllabus-query-params'

export interface SyllabusRepositoryPort extends RepositoryPort<Omit<SyllabusQueryParams, 'limit' | 'page'>, Syllabus> {
    findOneByIdAndOwner (search: FindManyPaginatedParams<SyllabusQueryParams>): Promise<Syllabus | null>
    findOneByCode(code: string): Promise<Syllabus | null>
}
