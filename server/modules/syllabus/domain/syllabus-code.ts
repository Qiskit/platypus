import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 3)

export type SyllabusCode = string

export const generate = () : SyllabusCode => `${nanoid()}-${nanoid()}`
