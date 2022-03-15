import { Syllabus } from '../../database/syllabus-entity'
import { SyllabusMapper } from '../../database/syllabus-mapper'
import { SyllabusRepository } from '../../database/syllabus-repository'
import { SyllabusQueryParamsHttpRequest } from './find-syllabi-dto'

export class FindSyllabiService {
  static async execute (queryParams: SyllabusQueryParamsHttpRequest) {
    const syllabusMapper = new SyllabusMapper()

    const syllabusRepository = new SyllabusRepository(Syllabus, syllabusMapper)

    const syllabi = await syllabusRepository.findManyPaginated(queryParams)

    return syllabi
  }
}
