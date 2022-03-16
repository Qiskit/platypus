import { Syllabus } from '../../database/syllabus-entity'
import { SyllabusMapper } from '../../database/syllabus-mapper'
import { SyllabusRepository } from '../../database/syllabus-repository'
import { SyllabusNotFound } from '../../exceptions/syllabus-not-found'
import { FindSyllabusByCodeHttpRequest } from './find-syllabus-by-code-dto'

export class FindSyllabusByIdService {
  static async execute (findSyllabusByCodeHttpRequest: FindSyllabusByCodeHttpRequest) {
    const syllabusMapper = new SyllabusMapper()

    const syllabusRepository = new SyllabusRepository(Syllabus, syllabusMapper)

    const syllabus = await syllabusRepository.findOneByCode(findSyllabusByCodeHttpRequest)

    if (!syllabus) {
      throw new SyllabusNotFound(findSyllabusByCodeHttpRequest.params.code)
    }
    return syllabus
  }
}
