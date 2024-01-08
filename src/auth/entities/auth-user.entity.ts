import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document, ObjectId, SchemaTypes } from 'mongoose';
import { USER_TYPES } from '../dto/register-user.dto';

@Schema({ collection: 'auth_user_logins', versionKey: false, timestamps: true })
export class AuthUser {
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
        required: [true, 'An user must have an user type'],
        enum: USER_TYPES
    })
    user_type: string;
 
    @Prop({
        type: String,
        required: [true, 'An user must have a name']
    })
    name: string;

    @Prop({
        type: String,
        required: [true, 'An user must have an email'],
        unique: [true, 'An user with given email exists. The email must be unique.']
    })
    email: string;

    @Prop({
        type: String,
        required: [true, 'An user must have a mobile no'],
        unique: [true, 'An user with given mobile no exists. The mobile no must be unique.']
    })
    mobile: string;

    @Prop({
        type: String,
        required: [true, 'An user must have a password']
    })
    password: string;
    
    @Prop({ 
        type: String,
        required: false,
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

export const AuthUserSchema = SchemaFactory.createForClass(AuthUser);
export type AuthUserDocument = AuthUser & Document;