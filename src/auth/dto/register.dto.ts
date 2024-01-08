import { IsString, IsNotEmpty, MinLength, IsEnum } from 'class-validator';

export enum USER_TYPES {
    ADMIN = 'A',
    USER = 'U',
    TRAINER = 'T',
}

export class RegisterDto {

    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    mobile: string;

    @IsNotEmpty()
    @IsEnum(USER_TYPES)
    user_type: string;

    @MinLength(8)
    @IsNotEmpty()
    @IsString()
    password: string;

}

export default RegisterDto;