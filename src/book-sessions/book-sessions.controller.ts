import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookSessionsService } from './book-sessions.service';
import { CreateBookSessionDto } from './dto/create-book-session.dto';
import { UpdateBookSessionDto } from './dto/update-book-session.dto';

@Controller('book-sessions')
export class BookSessionsController {
  constructor(private readonly bookSessionsService: BookSessionsService) {}

  @Post()
  create(@Body() createBookSessionDto: CreateBookSessionDto) {
    return this.bookSessionsService.create(createBookSessionDto);
  }

  @Get()
  findAll() {
    return this.bookSessionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookSessionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookSessionDto: UpdateBookSessionDto) {
    return this.bookSessionsService.update(+id, updateBookSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookSessionsService.remove(+id);
  }
}
