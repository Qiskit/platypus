import { RepositoryPort } from '../../../libs/ports/repository-port'
import { SyllabusDocument, SyllabusBase } from './syllabus-entity'

export interface SyllabusRepositoryPort extends RepositoryPort<SyllabusDocument, SyllabusBase> {
    findOneByCode(code: string): Promise<SyllabusDocument>
}
