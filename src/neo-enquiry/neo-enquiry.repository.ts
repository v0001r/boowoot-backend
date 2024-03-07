import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/common/database/entity.repository.base';
import { InjectModel } from '@nestjs/mongoose';
import { NeoEnquiry, NeoEnquiryDocument } from './entities/neo-enquiry.entity';

@Injectable()
export class NeoEnquiryRepository extends EntityRepository<NeoEnquiryDocument> {
  constructor(
    @InjectModel(NeoEnquiry.name)
    private readonly neoEnquiryModel: Model<NeoEnquiryDocument>,
  ) {
    super(neoEnquiryModel);
  }

}
