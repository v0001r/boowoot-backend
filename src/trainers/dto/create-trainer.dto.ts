import { IsString, IsNotEmpty, MinLength, IsEnum } from 'class-validator';


export enum STATUS {
    APPROVED = 'A',
    REJECTED = 'R',
    PENDING = 'P',
}

export class CreateTrainerDto {
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
    password: string;

    @IsString()
    gender: string;

    @IsString()
    age: string;

    @IsString()
    language: string;

    state: string;

    @IsString()
    account_holder_name: string;

    @IsString()
    account_no: string;

    @IsString()
    pin: string;

    @IsString()
    confirm_account_no: string;

    @IsString()
    bank_name: string;

    @IsString()
    branch_name: string;

    @IsString()
    ifsc_code: string;

    @IsString()
    c_address: string;

    @IsString()
    district: string;

    @IsString()
    qualification: string;

    serviceType: [];

    servicingArea: [];

    documents: []

}
