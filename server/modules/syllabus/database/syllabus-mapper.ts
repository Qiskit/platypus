import { OrmMapperBase } from '../../../libs/database/orm-mapper-base'
import { Syllabus as SyllabusDomain } from '../domain/syllabus'
import { SyllabusDocument, Syllabus as SyllabusOrm } from './syllabus-entity'

export class SyllabusMapper implements OrmMapperBase<SyllabusDocument, SyllabusDomain> {
  toOrmEntity (data: SyllabusDomain): SyllabusDocument {
    return new SyllabusOrm(data)
  }

  toDomainEntity (document: SyllabusDocument): SyllabusDomain {
    return {
      id: document.id,
      name: document.name,
      instructor: document.instructor,
      location: document.location,
      institution: document.institution,
      officeHours: document.officeHours,
      classHours: document.classHours,
      email: document.email,
      descriptionHtml: document.descriptionHtml,
      sections: document.sections,
      additionalHtml: document.additionalHtml,
      code: document.code,
      owners: document.owners.map(id => id.toString())
    }
  }
}
