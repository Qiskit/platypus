import { CreateSyllabus } from './create-syllabus-dto';
import { SyllabusRepository } from '../../database/syllabus-repository'
import { Syllabus } from '../../database/syllabus-entity'

export class CreateSyllabusService {
    static async execute(createSyllabusHttpRequest: CreateSyllabus) {
        const syllabusRepository = new SyllabusRepository(Syllabus)
        const syllabusDocument = new Syllabus(createSyllabusHttpRequest)
        const newSyllabus = await syllabusRepository.save(syllabusDocument)
    }
}