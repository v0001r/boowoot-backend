import { PartialType } from '@nestjs/mapped-types';
import { CreateCorporateEnquiryDto } from './create-corporate-enquiry.dto';

export class UpdateCorporateEnquiryDto extends PartialType(CreateCorporateEnquiryDto) {}
