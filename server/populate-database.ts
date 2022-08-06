/* eslint-disable no-console */
import { User } from '@mathigon/studio/server/models/user'
import { CONFIG } from '@mathigon/studio/server/utilities/utilities'
import type { Config } from '@mathigon/studio/server/interfaces'
import { connection } from 'mongoose'

import { Syllabus } from './modules/syllabus/database/syllabus-entity'
import { logger } from './libs/logger/logger'

import { IS_PRODUCTION } from './configuration'

interface PopulateConfig extends Config {
  mockData: {
    email: string
  }
}

const createUserIfNotExist = async () => {
  const email = (CONFIG as PopulateConfig).mockData.email

  const userData = {
    email,
    firstName: 'John',
    lastName: 'Doe',
    acceptedPolicies: true
  }

  const userDocument = await User.findOneAndUpdate({ email }, userData, { new: true, upsert: true })

  return userDocument
}

const createSyllabusIfNotExist = async (userId: string) => {
  const code = 'ABC-DEF'

  const syllabusData = {
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
    code,
    ownerList: [userId]
  }

  const syllabusDocument = await Syllabus.findOneAndUpdate({ code }, syllabusData, { new: true, upsert: true })

  return syllabusDocument
}

const populate = async () => {
  const user = await createUserIfNotExist()
  logger.debug(`Mock user: ${user._id}`)

  const syllabus = await createSyllabusIfNotExist(user._id.toString())
  logger.debug(`Mock syllabus: ${syllabus._id}`)
}

export const generateMockData = async () => {
  if (IS_PRODUCTION) { return }

  return await new Promise((resolve) => {
    logger.info('Connecting to DB...')
    const interval = setInterval(async () => {
      if (connection.readyState === 1) {
        resolve(true)
        clearInterval(interval)

        logger.info('Initiating populate database process...')
        await populate()
        logger.info('Finished with the populate database')
      }
    }, 1000)
  })
}
