import { MongooseRepositoryBase } from '../../../libs/database/mongoose-repository-base'
import { NotImplementedException } from '../../../libs/exceptions/not-implemented-exception'

import { SyllabusRepositoryPort } from './syllabus-repository-port'
import { SyllabusDocument, SyllabusBase } from '../database/syllabus-entity'

export class SyllabusRepository 
extends MongooseRepositoryBase<SyllabusDocument, SyllabusBase> 
implements SyllabusRepositoryPort {
    findOneByCode(code: string): Promise<SyllabusDocument> {
        throw new NotImplementedException()
    }
}
