import { ExceptionBase } from '../../../libs/exceptions/exception-base'
import { SyllabusExceptionNames } from './syllabus-exception-names'

export class SyllabusNotFound extends ExceptionBase {
  constructor (id?: string) {
    super(`Syllabus ${id} not found`)
  }

  readonly code = 404

  readonly name = SyllabusExceptionNames.syllabusNotFound
}
