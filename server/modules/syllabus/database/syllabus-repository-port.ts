import { RepositoryPort } from '../../../libs/ports/repository-port'
import { SyllabusDocument, SyllabusBase } from './syllabus-entity'
import { Syllabus } from '../domain/syllabus'

export interface SyllabusRepositoryPort extends RepositoryPort<SyllabusDocument, SyllabusBase, Syllabus> {
    findOneByCode(code: string): Promise<SyllabusDocument>
}
