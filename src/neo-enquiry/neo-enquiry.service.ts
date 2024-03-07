import { ConflictException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateNeoEnquiryDto } from './dto/create-neo-enquiry.dto';
import { UpdateNeoEnquiryDto } from './dto/update-neo-enquiry.dto';
import { NeoEnquiry, NeoEnquiryDocument } from './entities/neo-enquiry.entity';
import { NeoEnquiryRepository } from './neo-enquiry.repository';

@Injectable()
export class NeoEnquiryService {
  constructor(
    private readonly neoEnquiryRepository: NeoEnquiryRepository,

    @InjectModel(NeoEnquiry.name) private readonly neoEnquiryModel: Model<NeoEnquiryDocument>,

) {}
  async create(createNeoEnquiryDto: CreateNeoEnquiryDto) {
    try {

      const data = {
        name: createNeoEnquiryDto.name,
        email: createNeoEnquiryDto.email,
        phone: createNeoEnquiryDto.phone,
        address: createNeoEnquiryDto.address,
        requirement: createNeoEnquiryDto.requirement,
       
      }

     const trainer =  await this.neoEnquiryRepository.create({...data});

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

  const query = this.neoEnquiryModel.find(options);

  const items = await query.exec();
  return items;
}


 
}
