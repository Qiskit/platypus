import pickBy from 'lodash/pickBy'

import { Syllabus } from '../../database/syllabus-entity'
import { SyllabusMapper } from '../../database/syllabus-mapper'
import { SyllabusRepository } from '../../database/syllabus-repository'
import { SyllabusNotFound } from '../../exceptions/syllabus-not-found'
import { UpdateSyllabusHttpRequest } from './update-syllabus-dto'

export class UpdateSyllabusService {
  static async execute (updateSyllabusHttpRequest: UpdateSyllabusHttpRequest) {
    const syllabusMapper = new SyllabusMapper()

    const syllabusRepository = new SyllabusRepository(Syllabus, syllabusMapper)

    const newFields = pickBy(updateSyllabusHttpRequest, field => field !== undefined)

    const updatedSyllabus = await syllabusRepository.updateSyllabusFilteredByOwner(updateSyllabusHttpRequest.id, updateSyllabusHttpRequest.owner, newFields)

    if (!updatedSyllabus) {
      throw new SyllabusNotFound(updateSyllabusHttpRequest.id)
    }
    return updatedSyllabus
  }
}
