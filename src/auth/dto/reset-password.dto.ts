import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ValidateConfPassword } from 'src/common/validators/validate-confpassword';

export class ResetPasswordDto {
    @IsNotEmpty()
    @IsString()
    reset_token: string

    @MinLength(8)
    @IsNotEmpty()
    @IsString()
    password: string;

    @ValidateConfPassword()
    @MinLength(8)
    @IsNotEmpty()
    @IsString()
    conf_password: string
}

export default ResetPasswordDto