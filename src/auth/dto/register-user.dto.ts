import { IsString, IsNotEmpty, MinLength, IsEnum } from 'class-validator';

export enum USER_TYPES {
    ADMIN = 'AD',
    STAFF = 'S',
    AGENT = 'A',
    CLIENT = 'C',
    CHANNEL_PARTNER = 'CP',
    CHILD_USER = 'CU',
}

export class RegisterUserDto {
    @IsNotEmpty()
    @IsString()
    ref_id: string;

    @IsNotEmpty()
    @IsEnum(USER_TYPES)
    user_type: string;

    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsString()
    email: string;

    @MinLength(8)
    @IsNotEmpty()
    @IsString()
    password: string;
    
    @IsNotEmpty()
    @IsString()
    mobile: string;
}

export default RegisterUserDto;