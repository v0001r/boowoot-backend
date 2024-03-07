import { PartialType } from '@nestjs/mapped-types';
import { CreateNeoEnquiryDto } from './create-neo-enquiry.dto';

export class UpdateNeoEnquiryDto extends PartialType(CreateNeoEnquiryDto) {}
