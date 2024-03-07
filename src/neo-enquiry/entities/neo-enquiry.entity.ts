import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import mongoose, { Document, ObjectId } from 'mongoose';

@Schema({collection: 'neo-enquiry', versionKey: false, timestamps: true})
export class NeoEnquiry {@Transform(({ value }) => value.toString())
_id: mongoose.ObjectId;

@Prop({
    type: String,
})
name: string;

@Prop({
    type: String,
})
address: string;

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

export const NeoEnquirySchema = SchemaFactory.createForClass(NeoEnquiry);
export type NeoEnquiryDocument = NeoEnquiry & Document;
