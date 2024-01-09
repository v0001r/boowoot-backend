import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Inject, Scope, Injectable } from '@nestjs/common';
import { TrainersService } from './trainers.service';
import { Express, Request } from 'express';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { REQUEST } from '@nestjs/core';

@Controller('trainers')
@Injectable({ scope: Scope.REQUEST })
export class TrainersController {
  constructor(private readonly trainersService: TrainersService, @Inject(REQUEST) private readonly request: Request) {}

  @Post()
  create(@Body() createTrainerDto: CreateTrainerDto) {
    return this.trainersService.create(createTrainerDto);
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.trainersService.find(req.query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trainersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrainerDto: UpdateTrainerDto) {
    return this.trainersService.update(+id, updateTrainerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainersService.remove(+id);
  }
}
