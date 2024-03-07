import { Controller, Get, Post, Body, Req, Inject, Scope, Injectable } from '@nestjs/common';
import { NeoEnquiryService } from './neo-enquiry.service';
import { CreateNeoEnquiryDto } from './dto/create-neo-enquiry.dto';
import { UpdateNeoEnquiryDto } from './dto/update-neo-enquiry.dto';
import { Express, Request } from 'express';
import { REQUEST } from '@nestjs/core';

@Controller('neo-enquiry')
@Injectable({ scope: Scope.REQUEST })

export class NeoEnquiryController {
  constructor(private readonly neoEnquiryService: NeoEnquiryService, @Inject(REQUEST) private readonly request: Request) {}

  @Post()
  create(@Body() createNeoEnquiryDto: CreateNeoEnquiryDto) {
    return this.neoEnquiryService.create(createNeoEnquiryDto);
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.neoEnquiryService.find(req.query);
  }

 
}
