import { IsString, IsNotEmpty, MinLength, IsEnum } from 'class-validator';

export class CreateNeoEnquiryDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    requirement: string;
}
