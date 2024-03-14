import { Controller, Get, Post, Req, Inject, Scope, Injectable} from '@nestjs/common';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { DietPlansService } from './diet-plans.service';


@Controller('diet-plans')
@Injectable({ scope: Scope.REQUEST })

export class DietPlansController {
  constructor(private readonly dietPlansService: DietPlansService, @Inject(REQUEST) private readonly request: Request) {}

  @Post()
  create(body) {
    return this.dietPlansService.create(body);
 }

 @Get()
 findAll(@Req() req: Request) {
   return this.dietPlansService.findAll(req.query);
 }
}
