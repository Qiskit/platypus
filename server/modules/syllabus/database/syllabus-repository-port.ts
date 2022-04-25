import { FindManyPaginatedParams, RepositoryPort } from '../../../libs/ports/repository-port'
import { Syllabus } from '../domain/syllabus'
import { SyllabusQueryParams } from '../domain/syllabus-query-params'

export interface SyllabusRepositoryPort extends RepositoryPort<Omit<SyllabusQueryParams, 'limit' | 'page'>, Syllabus> {
    findOneByCode (search: FindManyPaginatedParams<SyllabusQueryParams>): Promise<Syllabus | null>
    updateSyllabusFilteredByOwner (id: string, owner: string, data: Partial<Syllabus>): Promise<Syllabus | null>
}
