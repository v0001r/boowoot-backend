import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import mongoose, { Document, ObjectId } from 'mongoose';
import { STATUS } from '../dto/create-trainer.dto';

@Schema({collection: 'trainers', versionKey: false, timestamps: true})
export class Trainer {
    @Transform(({ value }) => value.toString())
    _id: mongoose.ObjectId;
 
    @Prop({
        type: String,
        required: [true, 'A Trainer must have a name']
    })
    name: string;

    @Prop({
        type: String,
    })
    ref_id: string;

    @Prop({
        type: String,
        required: [true, 'A user must have an email'],
    })
    email: string;

    @Prop({
        type: String,
        required: [true, 'A user must have an mobile'],
    })
    phone: string;

    @Prop({
        type: String
    })
    gender: string;
    @Prop({
        type: String
    })
    age: string;
    @Prop({
        type: String
    })
    language: string;
    @Prop({
        type: String
    })
    state: string;
    @Prop({
        type: String
    })
    account_holder_name: string;
    @Prop({
        type: String
    })
    account_no: string;
    @Prop({
        type: String
    })
    confirm_account_no: string;
    @Prop({
        type: String
    })
    bank_name: string;
    @Prop({
        type: String
    })
    branch_name: string;
    @Prop({
        type: String
    })
    ifsc_code: string;
    @Prop({
        type: String
    })
    c_address: string;
    @Prop({
        type: String
    })
    district: string;
    @Prop({
        type: String
    })
    pin: string;
    @Prop({
        type: String
    })
    qualification: string;
    @Prop({
        type: [String]
    })
    service_type: string[];
    @Prop({
        type: [String]
    })
    servicing_area: string[];
    @Prop({
        type: [String]
    })
    documents: string[];
    @Prop({
        type: String
    })
    adhhar: string;
    @Prop({
        type: String
    })
    pan: string;
    @Prop({
        type: String
    })
    photo: string;
    @Prop({
        type: String
    })
    certificate: string;
   

    @Prop({
        type: String,
        required: [true, 'user user type is required'],
        enum: STATUS
    })
    status: string;

    @Prop({
        type: String,
        default: 'Unblock'
    })
    block_status: string;

    @Prop({
        type: String,
    })
    otp: string;

    @Prop({
        type: String,
    })
    kyc: string;

    @Prop()
    createdAt: Date

    @Prop()
    updatedAt: Date

}


export const TrainerSchema = SchemaFactory.createForClass(Trainer);
export type TrainerDocument = Trainer & Document;