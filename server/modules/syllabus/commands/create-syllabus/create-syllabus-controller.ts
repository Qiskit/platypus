import { Request, Response, NextFunction } from 'express'

import { CreateSyllabusHttpRequest } from './create-syllabus-dto'

export const CreateSyllabusController = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    const userId = "abcdefg"; // TODO Get the user from the request

    const syllabus = new CreateSyllabusHttpRequest({ ...body, owners: [userId] });

    try {
        await syllabus.validate()
        console.log(syllabus)
    } catch (error) {
        console.log(error)
    }

    res.json({ result: 'ok' });
}