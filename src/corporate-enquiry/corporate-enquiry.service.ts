import { Injectable } from '@nestjs/common';
import { CreateCorporateEnquiryDto } from './dto/create-corporate-enquiry.dto';
import { UpdateCorporateEnquiryDto } from './dto/update-corporate-enquiry.dto';

@Injectable()
export class CorporateEnquiryService {
  create(createCorporateEnquiryDto: CreateCorporateEnquiryDto) {
    return 'This action adds a new corporateEnquiry';
  }

  findAll() {
    return `This action returns all corporateEnquiry`;
  }

  findOne(id: number) {
    return `This action returns a #${id} corporateEnquiry`;
  }

  update(id: number, updateCorporateEnquiryDto: UpdateCorporateEnquiryDto) {
    return `This action updates a #${id} corporateEnquiry`;
  }

  remove(id: number) {
    return `This action removes a #${id} corporateEnquiry`;
  }
}
