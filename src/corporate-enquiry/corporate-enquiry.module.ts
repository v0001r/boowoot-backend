import { Module } from '@nestjs/common';
import { CorporateEnquiryService } from './corporate-enquiry.service';
import { CorporateEnquiryController } from './corporate-enquiry.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CorporateEnquiry, CorporateEnquirySchema } from './entities/corporate-enquiry.entity';
import { CorporateEnquiryRepository } from './corporate-enquiry.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CorporateEnquiry.name,
        schema: CorporateEnquirySchema,
      }
    ]),
  ],
  controllers: [CorporateEnquiryController],
  providers: [CorporateEnquiryService, CorporateEnquiryRepository]
})
export class CorporateEnquiryModule {}
