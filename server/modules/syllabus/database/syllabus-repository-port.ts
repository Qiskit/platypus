import { RepositoryPort } from '../../../libs/ports/repository-port'
import { Syllabus } from '../domain/syllabus'
import { SyllabusQueryParams } from '../domain/syllabus-query-params'
import { SyllabusDocument } from './syllabus-entity'

export interface SyllabusRepositoryPort extends RepositoryPort<SyllabusDocument, Omit<SyllabusQueryParams, 'limit' | 'page'>, Syllabus> {
    findOneByCode(code: string): Promise<SyllabusDocument>
}
