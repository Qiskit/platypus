import { Document, Types } from 'mongoose';


export interface MongooseDocumentBase extends Document {
    // Mongoose Properties
    _id: Types.ObjectId;
    
    deleted: boolean;
    
    createdAt: Date;
    updatedAt: Date;

    // Virtual Property
    id: string;
}
