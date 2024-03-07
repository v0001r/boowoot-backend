import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import mongoose, { Document, ObjectId } from 'mongoose';

@Schema({collection: 'corporate-enquiry', versionKey: false, timestamps: true})
export class CorporateEnquiry {
    @Transform(({ value }) => value.toString())
    _id: mongoose.ObjectId;
 
    @Prop({
        type: String,
    })
    name: string;

    @Prop({
        type: String,
    })
    company: string;

    @Prop({
        type: String,
    })
    email: string;
    
    @Prop({
        type: String,
    })
    phone: string;

    @Prop({
        type: String,
    })
    requirement: string;

    @Prop()
    createdAt: Date

    @Prop()
    updatedAt: Date
}

export const CorporateEnquirySchema = SchemaFactory.createForClass(CorporateEnquiry);
export type CorporateEnquiryDocument = CorporateEnquiry & Document;