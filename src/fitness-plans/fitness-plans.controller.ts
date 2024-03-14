import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Inject, Scope, Injectable} from '@nestjs/common';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { FitnessPlansService } from './fitness-plans.service';

@Controller('fitness-plans')
@Injectable({ scope: Scope.REQUEST })

export class FitnessPlansController {
  constructor(private readonly fitnessPlansService: FitnessPlansService, @Inject(REQUEST) private readonly request: Request) {}

  @Post()
  create(body) {
    return this.fitnessPlansService.create(body);
 }

  @Get()
  findAll(@Req() req: Request) {
    return this.fitnessPlansService.findAll(req.query);
  }

}
