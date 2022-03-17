import pickBy from 'lodash/pickBy'

import { Syllabus } from '../../database/syllabus-entity'
import { SyllabusMapper } from '../../database/syllabus-mapper'
import { SyllabusRepository } from '../../database/syllabus-repository'
import { UpdateSyllabusHttpRequest } from './update-syllabus-dto'

export class UpdateSyllabusService {
  static async execute (updateSyllabusHttpRequest: UpdateSyllabusHttpRequest) {
    const syllabusMapper = new SyllabusMapper()

    const syllabusRepository = new SyllabusRepository(Syllabus, syllabusMapper)

    // TODO: Check here if the user can edite the syllabus

    const newFields = pickBy(updateSyllabusHttpRequest, field => field !== undefined)

    const updatedSyllabus = await syllabusRepository.updateSyllabusFilteredByOwner(updateSyllabusHttpRequest.id, updateSyllabusHttpRequest.owner, newFields)

    return updatedSyllabus
  }
}
