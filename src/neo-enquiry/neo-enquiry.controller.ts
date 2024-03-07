import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NeoEnquiryService } from './neo-enquiry.service';
import { CreateNeoEnquiryDto } from './dto/create-neo-enquiry.dto';
import { UpdateNeoEnquiryDto } from './dto/update-neo-enquiry.dto';

@Controller('neo-enquiry')
export class NeoEnquiryController {
  constructor(private readonly neoEnquiryService: NeoEnquiryService) {}

  @Post()
  create(@Body() createNeoEnquiryDto: CreateNeoEnquiryDto) {
    return this.neoEnquiryService.create(createNeoEnquiryDto);
  }

  @Get()
  findAll() {
    return this.neoEnquiryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.neoEnquiryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNeoEnquiryDto: UpdateNeoEnquiryDto) {
    return this.neoEnquiryService.update(+id, updateNeoEnquiryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.neoEnquiryService.remove(+id);
  }
}
