import { Request, Response, NextFunction } from 'express'

import { Syllabus } from '../../domain/syllabus'
import { FindSyllabusByCodeHttpRequest } from './find-syllabus-by-code-dto'
import { FindSyllabusByIdService } from './find-syllabus-by-code-service'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const FindSyllabusByCodeController = async (req: Request, res: Response, next: NextFunction) => {
  const { code } = req.params

  const findSyllabusByCodeHttpRequest = new FindSyllabusByCodeHttpRequest({ code })

  const mockResponse = {
    title: 'PHYS 332: Quantum Mechanics II (Spring, 2022)',
    instructor: 'instructor name',
    location: 'Madrid',
    university: 'UCM',
    officeHours: '10:00 to 13:00',
    classHours: '15:00 to 18:00',
    email: 'none@none.never',
    module: [
      {
        title: 'Week 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vehicula tellus non ligula hendrerit interdum. Suspendisse sit amet erat vitae urna mattis sodales. Nullam consequat sagittis tellus. In et justo ex. Suspendisse tempor auctor blandit. Sed vel est eu felis vehicula varius id non ante. Morbi lacinia dolor ac nunc malesuada, dictum imperdiet ligula pellentesque.',
        chapterList: [
          {
            name: 'Why quantum computing?',
            url: '/course/introduction/why-quantum-computing'
          },
          {
            name: 'The atoms of computation',
            url: '/course/introduction/the-atoms-of-computation'
          },
          {
            name: 'What is quantum?',
            url: '/course/introduction/what-is-quantum'
          }
        ]
      }
    ]
  }

  // TODO: This response must be a type from a domain or an exception
  // let response: Syllabus | unknown
  // try {
  //   response = await FindSyllabusByIdService.execute(findSyllabusByCodeHttpRequest)
  // } catch (error) {
  //   // TODO: update res.status when we start to use our internal exceptions
  //   response = error
  //   // TODO: implemente new log system
  //   // eslint-disable-next-line no-console
  //   console.log(error)
  // }

  res.render('syllabus', {
    syllabus: mockResponse
  })
}
