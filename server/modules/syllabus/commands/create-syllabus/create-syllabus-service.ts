import { Syllabus } from '../../database/syllabus-entity'
import { SyllabusMapper } from '../../database/syllabus-mapper'
import { SyllabusRepository } from '../../database/syllabus-repository'
import { CreateSyllabusHttpRequest } from './create-syllabus-dto'

export class CreateSyllabusService {
  static async execute (createSyllabusHttpRequest: CreateSyllabusHttpRequest) {
    const syllabusMapper = new SyllabusMapper()

    const syllabusRepository = new SyllabusRepository(Syllabus, syllabusMapper)

    // TODO: check here if the code doesn't exist before save it and generate another one in case it exists

    const newSyllabus = await syllabusRepository.save(createSyllabusHttpRequest)

    return newSyllabus
  }
}
