import { Syllabus } from '../../database/syllabus-entity'
import { SyllabusMapper } from '../../database/syllabus-mapper'
import { SyllabusRepository } from '../../database/syllabus-repository'
import { SyllabusNotFound } from '../../exceptions/syllabus-not-found'
import { FindSyllabusByIdHttpRequest } from './find-syllabus-by-id-dto'

export class FindSyllabusByIdService {
  static async execute (findSyllabusByIdHttpRequest: FindSyllabusByIdHttpRequest) {
    const syllabusMapper = new SyllabusMapper()

    const syllabusRepository = new SyllabusRepository(Syllabus, syllabusMapper)

    const syllabus = await syllabusRepository.findOneByIdAndOwner(findSyllabusByIdHttpRequest)

    if (!syllabus) {
      throw new SyllabusNotFound(findSyllabusByIdHttpRequest.params.code)
    }
    return syllabus
  }
}
