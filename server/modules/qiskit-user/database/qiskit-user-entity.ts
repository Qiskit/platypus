import { Model, model, Schema, Types } from 'mongoose'

import { MongooseDocumentBase } from '../../../libs/database/mongoose-document-base'

export interface QiskitUserBase {
    apiToken: string,
    quantumUserId: string,

    user: Types.ObjectId
}

export interface QiskitUserDocument extends QiskitUserBase, MongooseDocumentBase { }

interface QiskitUserModel extends Model<QiskitUserDocument> { }

const QiskitUserSchema = new Schema<QiskitUserDocument, QiskitUserModel>({
  apiToken: { type: String, default: undefined },
  quantumUserId: { type: String, default: undefined },

  user: { type: Types.ObjectId, ref: 'User' }
})

export const QiskitUser = model<QiskitUserDocument, QiskitUserModel>('QiskitUser', QiskitUserSchema)
