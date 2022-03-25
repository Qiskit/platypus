import { Model, model, Schema, Types } from 'mongoose'

import { MongooseDocumentBase } from '../../../libs/database/mongoose-document-base'

type SyllabusCode = string

type SyllabusCourse = { title: string, unitList: string[] }

export interface SyllabusBase {
    code: SyllabusCode,

    name: string,
    instructor: string,
    location: string,
    institution: string,
    officeHours: string,
    classHours: string,
    email: string,
    descriptionHtml: string,
    courseList: SyllabusCourse[]

    ownerList: Types.ObjectId[],
}

export interface SyllabusDocument extends SyllabusBase, MongooseDocumentBase {
    // TODO: should we validate the email as we are doing with Users?
}

interface SyllabusModel extends Model<SyllabusDocument> {}

const SyllabusSchema = new Schema<SyllabusDocument, SyllabusModel>({
  code: { type: String, index: true, unique: true, sparse: true },

  name: { type: String, maxlength: 255 },
  instructor: { type: String, maxlength: 64 },
  location: { type: String, maxlength: 255 },
  institution: { type: String, maxlength: 255 },
  officeHours: { type: String, maxlength: 255 },
  classHours: { type: String, maxlength: 255 },
  email: { type: String, maxlength: 64 },
  descriptionHtml: { type: String },
  courseList: [{
    title: String,
    unitList: [String]
  }],
  deleted: { type: Boolean, default: false },

  ownerList: { type: [Types.ObjectId], ref: 'User' }
}, { timestamps: true })

export const Syllabus = model<SyllabusDocument, SyllabusModel>('Syllabus', SyllabusSchema)
