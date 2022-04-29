/* eslint-disable no-console */
import { User } from '@mathigon/studio/server/models/user'
import { CONFIG } from '@mathigon/studio/server/utilities/utilities'
import type { Config } from '@mathigon/studio/server/interfaces'
import { connection } from 'mongoose'

import { Syllabus } from './modules/syllabus/database/syllabus-entity'
import { logger } from './libs/logger/logger'

interface PopulateConfig extends Config {
  mockData: {
    email: string
  }
}

const cleanUsers = async () => {
  await User.deleteMany()
}

const createUser = async () => {
  const newUserDocument = new User({
    email: (CONFIG as PopulateConfig).mockData.email,
    firstName: 'John',
    lastName: 'Doe',
    acceptedPolicies: true
  })
  return await newUserDocument.save()
}

const cleanSyllabus = async () => {
  await Syllabus.deleteMany()
}

const createSyllabus = async (userId: string) => {
  const newSyllabusDocument = new Syllabus({
    name: 'PHYS 332: Quantum Mechanics II (Spring, 2022)',
    instructor: 'John Doe',
    location: 'Online via web conference',
    institution: 'University',
    officeHours: 'MW 2:30pm-4pm via web conferece apt',
    classHours: 'MWF 11:40am-12:30PM',
    email: 'john.doe@example.com',
    courseList: [
      {
        title: 'Weeks 1-2: Identical particles',
        description: 'Course info.',
        unitList: [
          '976e9da6-6c33-4e2f-b7eb-f9588f700f07'
        ]
      }
    ],
    code: 'ABC-DEF',
    ownerList: [userId]
  })
  return await newSyllabusDocument.save()
}

export const clean = async () => {
  if (process.env.NODE_ENV === 'production') { return }
  await cleanUsers()
  await cleanSyllabus()
}

export const populate = async () => {
  if (process.env.NODE_ENV === 'production') { return }
  const newUser = await createUser()
  await createSyllabus(newUser._id.toString())
}

export const cleanAndPopulate = async () => {
  // TODO: we should use our logs here once time we have them
  if (process.env.NODE_ENV === 'production') { return }

  return await new Promise((resolve) => {
    logger.info('Connecting to DB...')
    const interval = setInterval(async () => {
      if (connection.readyState === 1) {
        resolve(true)
        clearInterval(interval)

        logger.info('Initiating clean and populate database process...')
        await clean()
        await populate()
        logger.info('Finished with the clean and populate database')
      }
    }, 1000)
  })
}
