import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import mongoose, { Document, ObjectId } from 'mongoose';

@Schema({collection: 'fitness', versionKey: false, timestamps: true})
export class FitnessPlan {
    @Transform(({ value }) => value.toString())
    _id: mongoose.ObjectId;
 
    @Prop({
        type: String,
    })
    plan: string;
    @Prop({
        type: String,
    })
    amount: string;
    @Prop({
        type: String,
    })
    service: string;
    @Prop({
        type: String,
    })
    activity: string;
    @Prop({
        type: String,
    })
    gymwork: string;
    @Prop({
        type: String,
    })
    age: string;
    @Prop({
        type: String,
    })
    gender: string;
    @Prop({
        type: String,
    })
    goal: string;
    @Prop({
        type: String,
    })
    height: string;
    @Prop({
        type: String,
    })
    goalreach: string;
    @Prop({
        type: String,
    })
    injury: string;
    @Prop({
        type: String,
    })
    medical: string;
    @Prop({
        type: String,
    })
    pain: string;
    @Prop({
        type: String,
    })
    weight: string;
    @Prop({
        type: String,
    })
    workpreference: string;
    @Prop({
        type: String,
    })
    transaction_id: string;
    @Prop({
        type: String,
    })
    user_id: string;
    @Prop({
        type: String,
    })
    name: string;
    @Prop({
        type: String,
    })
    email: string;
    @Prop({
        type: String,
    })
    phone: string;
   
    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}

export const FitnessPlanSchema = SchemaFactory.createForClass(FitnessPlan);
export type FitnessPlanDocument = FitnessPlan & Document;
