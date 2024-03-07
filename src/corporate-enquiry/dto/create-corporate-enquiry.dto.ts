import { IsString, IsNotEmpty, MinLength, IsEnum } from 'class-validator';

export class CreateCorporateEnquiryDto {
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
    company: string;

    @IsNotEmpty()
    @IsString()
    requirement: string;
}
