import { RepositoryPort } from '../../../libs/ports/repository-port'
import { Syllabus } from '../domain/syllabus'
import { SyllabusDocument, SyllabusBase } from './syllabus-entity'

export interface SyllabusRepositoryPort extends RepositoryPort<SyllabusDocument, SyllabusBase, Syllabus> {
    findOneByCode(code: string): Promise<SyllabusDocument>
}
