import { Injectable } from '@nestjs/common';
import { CreateNeoEnquiryDto } from './dto/create-neo-enquiry.dto';
import { UpdateNeoEnquiryDto } from './dto/update-neo-enquiry.dto';

@Injectable()
export class NeoEnquiryService {
  create(createNeoEnquiryDto: CreateNeoEnquiryDto) {
    return 'This action adds a new neoEnquiry';
  }

  findAll() {
    return `This action returns all neoEnquiry`;
  }

  findOne(id: number) {
    return `This action returns a #${id} neoEnquiry`;
  }

  update(id: number, updateNeoEnquiryDto: UpdateNeoEnquiryDto) {
    return `This action updates a #${id} neoEnquiry`;
  }

  remove(id: number) {
    return `This action removes a #${id} neoEnquiry`;
  }
}
