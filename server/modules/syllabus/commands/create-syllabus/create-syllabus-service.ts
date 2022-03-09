import { Syllabus } from '../../database/syllabus-entity'
import { SyllabusMapper } from '../../database/syllabus-mapper'
import { SyllabusRepository } from '../../database/syllabus-repository'
import { CreateSyllabus } from './create-syllabus-dto'

export class CreateSyllabusService {
  static async execute (createSyllabusHttpRequest: CreateSyllabus) {
    const syllabusMapper = new SyllabusMapper()

    const syllabusRepository = new SyllabusRepository(Syllabus, syllabusMapper)

    const newSyllabus = await syllabusRepository.save(createSyllabusHttpRequest)

    return newSyllabus
  }
}
