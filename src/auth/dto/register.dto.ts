import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ValidateConfPassword } from 'src/common/validators/validate-confpassword';

export class RegisterDto {
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

    @ValidateConfPassword()
    @MinLength(8)
    @IsNotEmpty()
    @IsString()
    conf_password: string

    @IsString({ each: true })
    @IsNotEmpty()
    ips: string[];
}

export default RegisterDto;