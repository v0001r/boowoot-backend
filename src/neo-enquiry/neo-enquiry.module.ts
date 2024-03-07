import { Module } from '@nestjs/common';
import { NeoEnquiryService } from './neo-enquiry.service';
import { NeoEnquiryController } from './neo-enquiry.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NeoEnquiry, NeoEnquirySchema } from './entities/neo-enquiry.entity';
import { NeoEnquiryRepository } from './neo-enquiry.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: NeoEnquiry.name,
        schema: NeoEnquirySchema,
      }
    ]),
  ],
  controllers: [NeoEnquiryController],
  providers: [NeoEnquiryService, NeoEnquiryRepository]
})
export class NeoEnquiryModule {}
