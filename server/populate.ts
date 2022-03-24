import { User } from '@mathigon/studio/server/models/user'
import { Syllabus } from './modules/syllabus/database/syllabus-entity'

const cleanUsers = async () => {
  await User.deleteMany()
}

const cleanSyllabus = async () => {
  await Syllabus.deleteMany()
}

const populate = async () => {
  const newUserDocument = new User({
    email: 'john.doe@example.com', // TODO: get email from config.yaml
    firstName: 'John',
    lastName: 'Doe',
    acceptedPolicies: true
  })
  await newUserDocument.save()

  const newSyllabusDocument = new Syllabus({
    name: 'PHYS 332: Quantum Mechanics II (Spring, 2022)', // TODO: title
    instructor: 'John Doe',
    location: 'Online via web conference',
    institution: 'Oxford',
    officeHours: 'MW 2:30pm-4pm via web conferece apt',
    classHours: 'MWF 11:40am-12:30PM',
    email: 'john.doe@example.com',
    descriptionHtml: '<b>Course info</b><br/>This course is awesome.',
    sections: [ // TODO: moduleList
      {
        title: 'Weeks 1-2: Identical particles',
        chapters: [ // TODO: chapterList
          10,
          11,
          13,
          20,
          21
        ]
      }
    ],
    code: 'ABC-DEF',
    owners: [newUserDocument.id]
  })
  await newSyllabusDocument.save()
}
