import { IsString, IsNotEmpty, MinLength, IsEnum } from 'class-validator';
import { ValidateConfPassword } from 'src/common/validators/validate-confpassword';

export enum USER_TYPES {
    ADMIN = 'AD',
    STAFF = 'S',
    AGENT = 'A',
    CLIENT = 'C',
    CHANNEL_PARTNER = 'CP',
    CHILD_USER = 'CU',
}

export class RegisterDto {

    @IsNotEmpty()
    @IsString()
    ref_id: string;

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

    @IsString()
    ip: string;

    @IsString()
    mac_id: string;
}

export default RegisterDto;