import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Inject, Scope, Injectable, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator } from '@nestjs/common';
import { TrainersService } from './trainers.service';
import { Express, Request } from 'express';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { REQUEST } from '@nestjs/core';
import { FileInterceptor } from '@nestjs/platform-express';
import ParamsWithId from '../common/params-with-id';

@Controller('trainers')
@Injectable({ scope: Scope.REQUEST })
export class TrainersController {
  constructor(private readonly trainersService: TrainersService, @Inject(REQUEST) private readonly request: Request) {}

  @Post()
  async create(@Body() body) {
    return await this.trainersService.create(body);
  }

  @Post('approve')
  approve(@Body() body) {
    return this.trainersService.approve(body);
  }
  @Post('reject')
  reject(@Body() body) {
    return this.trainersService.reject(body);
  }

  @Post('block')
  block(@Body() body) {
    return this.trainersService.block(body);
  }
  @Post('unblock')
  unblock(@Body() body) {
    return this.trainersService.unblock(body);
  }
  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file'))
  async imageUpload(
    @Body() body,
    @UploadedFile(new ParseFilePipe({
      validators: [
        new FileTypeValidator({ fileType: '.(png|jpeg|jpg|pdf)' }),
        new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),  // 5 MB
      ],
      fileIsRequired: false,
    }),
  ) file: Express.Multer.File,
    ) {
      return await this.trainersService.upload(file);

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
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param() { id }: ParamsWithId,
    @Body() body, 
    @UploadedFile( 
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),  // 5 MB
        ],
      }),
    ) image: Express.Multer.File
    ) {
    return this.trainersService.update(id, body, image);
  }


}
