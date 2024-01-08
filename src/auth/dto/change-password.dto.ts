import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDto {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    old_password: string;

    @IsNotEmpty()
    @IsString()
    new_password: string;

    @IsNotEmpty()
    @IsString()
    conf_password: string;
}

export default ChangePasswordDto;