import { Request, Response, NextFunction } from 'express'

import { Syllabus } from '../../domain/syllabus'
import { CreateSyllabusHttpRequest } from './create-syllabus-dto'
import { CreateSyllabusService } from './create-syllabus-service'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const CreateSyllabusController = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req
  const userId = '6218ab82743124885c31fa75' // TODO: Get the user from the request

  const syllabus = new CreateSyllabusHttpRequest({ ...body, owners: [userId] })

  // TODO: This response must be a type from a domain or an exception
  let response: Syllabus | unknown
  try {
    await syllabus.validate()
    response = await CreateSyllabusService.execute(syllabus)
  } catch (error) {
    response = error
    // TODO: implemente new log system
    // eslint-disable-next-line no-console
    console.log(error)
  }

  res.json(response)
}
