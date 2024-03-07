import { Module } from '@nestjs/common';
import { CorporateEnquiryService } from './corporate-enquiry.service';
import { CorporateEnquiryController } from './corporate-enquiry.controller';

@Module({
  controllers: [CorporateEnquiryController],
  providers: [CorporateEnquiryService]
})
export class CorporateEnquiryModule {}
