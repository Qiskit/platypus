import { Model, model, Schema, Types } from 'mongoose';

import { MongooseDocumentBase } from '../../../libs/database/mongoose-document-base';

type Section = { title: string, chapters: number[] }

export interface SyllabusBase {
    code: string,

    name: string,
    instructor: string,
    location: string,
    university: string,
    officeHours: Date,
    classHours: Date,
    email: string,
    descriptionHtml: string,
    sections: Section[]
    additionalHtml: string
    
    owners: Types.ObjectId[],
}

export interface SyllabusDocument extends SyllabusBase, MongooseDocumentBase {
    // TODO: should we validate the email as we are doing with Users?
}

interface SyllabusModel extends Model<SyllabusDocument> {}

const SyllabusSchema = new Schema<SyllabusDocument, SyllabusModel>({
    code: {type: String, required: true, index: true, unique: true, sparse: true},
    
    name: {type: String, default: '', maxlength: 255},
    instructor: {type: String, default: '', maxlength: 64},
    location: {type: String, default: '', maxlength: 255},
    university: {type: String, default: '', maxlength: 255},
    officeHours: Date,
    classHours: Date,
    email: {type: String, default: '', maxlength: 64},
    descriptionHtml: {type: String, default: ''},
    sections: [{
        title: String, 
        chapters: [Number]
    }],
    additionalHtml: {type: String, default: ''},
    deleted: {type: Boolean, default: false},

    owners: {type: [Types.ObjectId], ref: 'User'},
}, {timestamps: true})

SyllabusSchema.pre<SyllabusDocument>('save', async function (next) {
    if(!this.code) {
        // TODO: method to generate the code dynamically
    }
    next();
});

export const Syllabus = model<SyllabusDocument, SyllabusModel>('Syllabus', SyllabusSchema);
