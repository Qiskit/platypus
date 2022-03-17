import { Syllabus } from '../../database/syllabus-entity'
import { SyllabusMapper } from '../../database/syllabus-mapper'
import { SyllabusRepository } from '../../database/syllabus-repository'
import { UpdateSyllabusHttpRequest } from './update-syllabus-dto'

export class UpdateSyllabusService {
  static async execute (updateSyllabusHttpRequest: UpdateSyllabusHttpRequest) {
    const syllabusMapper = new SyllabusMapper()

    const syllabusRepository = new SyllabusRepository(Syllabus, syllabusMapper)

    const updatedSyllabus = await syllabusRepository.update(updateSyllabusHttpRequest.id!, updateSyllabusHttpRequest)

    return updatedSyllabus
  }
}
