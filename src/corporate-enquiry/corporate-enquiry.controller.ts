import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CorporateEnquiryService } from './corporate-enquiry.service';
import { CreateCorporateEnquiryDto } from './dto/create-corporate-enquiry.dto';
import { UpdateCorporateEnquiryDto } from './dto/update-corporate-enquiry.dto';

@Controller('corporate-enquiry')
export class CorporateEnquiryController {
  constructor(private readonly corporateEnquiryService: CorporateEnquiryService) {}

  @Post()
  create(@Body() createCorporateEnquiryDto: CreateCorporateEnquiryDto) {
    return this.corporateEnquiryService.create(createCorporateEnquiryDto);
  }

  @Get()
  findAll() {
    return this.corporateEnquiryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.corporateEnquiryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCorporateEnquiryDto: UpdateCorporateEnquiryDto) {
    return this.corporateEnquiryService.update(+id, updateCorporateEnquiryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.corporateEnquiryService.remove(+id);
  }
}
