import { Request, Response, NextFunction } from 'express'

import { CreateSyllabusHttpRequest } from './create-syllabus-dto'
import { CreateSyllabusService } from './create-syllabus-service'

export const CreateSyllabusController = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    const userId = "6218ab82743124885c31fa75"; // TODO Get the user from the request

    const syllabus = new CreateSyllabusHttpRequest({ ...body, owners: [userId] });

    try {
        await syllabus.validate()
        CreateSyllabusService.execute(syllabus)
    } catch (error) {
        console.log(error)
    }

    res.json({ result: 'ok' });
}