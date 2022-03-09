import { MongooseRepositoryBase } from '../../../libs/database/mongoose-repository-base'
import { NotImplementedException } from '../../../libs/exceptions/not-implemented-exception'

import { Syllabus } from '../domain/syllabus'
import { SyllabusDocument, SyllabusBase } from '../database/syllabus-entity'
import { SyllabusRepositoryPort } from './syllabus-repository-port'

export class SyllabusRepository
  extends MongooseRepositoryBase<SyllabusDocument, SyllabusBase, Syllabus>
  implements SyllabusRepositoryPort {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findOneByCode (code: string): Promise<SyllabusDocument> {
    throw new NotImplementedException()
  }
}
