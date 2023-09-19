import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document, ObjectId } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema({ collection: 'auth_logins', versionKey: false, timestamps: true })
export class Auth {
    @Transform(({ value }) => value.toString())
    _id: ObjectId;
 
    @Prop({
        type: String,
        required: [true, 'A staff must have a name']
    })
    name: string;

    @Prop({
        type: String,
        required: [true, 'A staff must have an email'],
        unique: [true, 'A staff with that email exists. The email must be unique.']
    })
    email: string;

    @Prop({
        type: String,
        required: [true, 'A staff must have a password']
    })
    password: string;
    
    @Prop({ 
        type: String,
        required: [true, 'A staff must have allowed IP(s)'],
        set: (val: string[]) => val.join(','), 
        get: (val: string) => val.split(',') 
    })
    ips: string[];

    @Prop({
        type: String,
        required: false,
        default: null
    })
    refresh_token: string;

    @Prop({
        type: Boolean,
        required: false,
        default: true
    })
    status: boolean;

    @Prop()
    createdAt: Date

    @Prop()
    updatedAt: Date
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
export type AuthDocument = Auth & Document;