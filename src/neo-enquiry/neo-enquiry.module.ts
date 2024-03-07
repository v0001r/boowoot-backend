import { Module } from '@nestjs/common';
import { NeoEnquiryService } from './neo-enquiry.service';
import { NeoEnquiryController } from './neo-enquiry.controller';

@Module({
  controllers: [NeoEnquiryController],
  providers: [NeoEnquiryService]
})
export class NeoEnquiryModule {}
