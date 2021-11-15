interface HttpErrorConstructor {
    code: number,
    message: string
}

export class HttpError extends Error {
    code: number;

    constructor({ code, message }: HttpErrorConstructor) {
        super(message)
        this.code = code
    }
}
