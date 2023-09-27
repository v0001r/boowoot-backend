import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document, ObjectId, SchemaTypes } from 'mongoose';
import { USER_TYPES } from '../dto/register-user.dto';

@Schema({ collection: 'auth_logins', versionKey: false, timestamps: true })
export class Auth {
    @Transform(({ value }) => value.toString())
    _id: ObjectId;

    @Prop({
        type: SchemaTypes.ObjectId,
        required: [true, 'An user must have a reference id']
    })
    @Transform(({ value }) => value.toString())
    ref_id: string;
 
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
        required: [true, 'A staff must have an mobile'],
        unique: [true, 'A staff with that mobile exists. The mobile must be unique.']
    })
    mobile: string;

    @Prop({
        type: String,
        required: [true, 'Staff user type is required'],
        enum: USER_TYPES
    })
    user_type: string;

    @Prop({
        type: String,
        required: [true, 'A staff must have a password']
    })
    password: string;
    
    @Prop({ 
        type: String,
    })
    ip: string;

    @Prop({ 
        type: String,
    })
    mac_id: string;

    @Prop({
        type: String,
        required: false,
        default: null
    })
    refresh_token: string;

    @Prop({
        type: String,
        required: false,
        default: null
    })
    password_reset_token: string;

    @Prop({
        type: Number,
        required: false,
        default: null
    })
    password_reset_expires: number

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