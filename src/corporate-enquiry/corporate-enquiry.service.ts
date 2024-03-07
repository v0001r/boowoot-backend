import { ConflictException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCorporateEnquiryDto } from './dto/create-corporate-enquiry.dto';
import { UpdateCorporateEnquiryDto } from './dto/update-corporate-enquiry.dto';
import { CorporateEnquiryRepository } from './corporate-enquiry.repository';
import { CorporateEnquiry, CorporateEnquiryDocument } from './entities/corporate-enquiry.entity';

@Injectable()
export class CorporateEnquiryService {

  constructor(
    private readonly corporateEnquiryRepository: CorporateEnquiryRepository,

    @InjectModel(CorporateEnquiry.name) private readonly corporateEnquiryModel: Model<CorporateEnquiryDocument>,

) {}
  async create(createCorporateEnquiryDto: CreateCorporateEnquiryDto) {
    try {

      const data = {
        name: createCorporateEnquiryDto.name,
        email: createCorporateEnquiryDto.email,
        phone: createCorporateEnquiryDto.phone,
        company: createCorporateEnquiryDto.company,
        requirement: createCorporateEnquiryDto.requirement,
       
      }

     const trainer =  await this.corporateEnquiryRepository.create({...data});

      return {success: true, statusCode: 200};
  } catch (error) {
      console.log(error);
      throw new HttpException(error.response, error.status);
  }
  }

 
  
async find(params: any = {}) {
  const { s, page, limit, offset, sortBy, sortDir} = params;

  const options: any = {};

  // Build the common search keywords with a $or operator
  if (s) {
    options.$or = [
      { name: new RegExp(s, 'i') },
      { email: new RegExp(s, 'i') },
      { phone: new RegExp(s, 'i') }
    ];
  }
  const sort: any = { createdAt: 'desc' };
  if (sortBy) {
    sort[sortBy] = sortDir || 'asc';
  }

  const query = this.corporateEnquiryModel.find(options);

  const items = await query.exec();
  return items;
}

}
