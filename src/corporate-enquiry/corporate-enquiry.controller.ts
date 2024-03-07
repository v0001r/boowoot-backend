import { Controller, Get, Post, Body, Req, Inject, Scope, Injectable} from '@nestjs/common';
import { CorporateEnquiryService } from './corporate-enquiry.service';
import { CreateCorporateEnquiryDto } from './dto/create-corporate-enquiry.dto';
import { UpdateCorporateEnquiryDto } from './dto/update-corporate-enquiry.dto';
import { Express, Request } from 'express';
import { REQUEST } from '@nestjs/core';

@Controller('corporate-enquiry')
@Injectable({ scope: Scope.REQUEST })
export class CorporateEnquiryController {
  constructor(private readonly corporateEnquiryService: CorporateEnquiryService,  @Inject(REQUEST) private readonly request: Request) {}

  @Post()
  create(@Body() createCorporateEnquiryDto: CreateCorporateEnquiryDto) {
    return this.corporateEnquiryService.create(createCorporateEnquiryDto);
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.corporateEnquiryService.find(req.query);
  }


  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCorporateEnquiryDto: UpdateCorporateEnquiryDto) {
  //   return this.corporateEnquiryService.update(+id, updateCorporateEnquiryDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.corporateEnquiryService.remove(+id);
  // }
}
