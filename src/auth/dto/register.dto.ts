import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ValidateConfPassword } from 'src/common/validators/validate-confpassword';

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @MinLength(8)
    @IsNotEmpty()
    @IsString()
    password: string;

    @ValidateConfPassword()
    @MinLength(8)
    @IsNotEmpty()
    @IsString()
    conf_password: string

    @IsString()
    ips: string;
}

export default RegisterDto;