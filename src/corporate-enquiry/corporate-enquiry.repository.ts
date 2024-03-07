import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/common/database/entity.repository.base';
import { InjectModel } from '@nestjs/mongoose';
import { CorporateEnquiry, CorporateEnquiryDocument } from './entities/corporate-enquiry.entity';

@Injectable()
export class CorporateEnquiryRepository extends EntityRepository<CorporateEnquiryDocument> {
  constructor(
    @InjectModel(CorporateEnquiry.name)
    private readonly corporateEnquiryModel: Model<CorporateEnquiryDocument>,
  ) {
    super(corporateEnquiryModel);
  }

}
