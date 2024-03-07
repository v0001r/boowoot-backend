import { Injectable } from '@nestjs/common';
import { CreateBookSessionDto } from './dto/create-book-session.dto';
import { UpdateBookSessionDto } from './dto/update-book-session.dto';

@Injectable()
export class BookSessionsService {
  create(createBookSessionDto: CreateBookSessionDto) {
    return 'This action adds a new bookSession';
  }

  findAll() {
    return `This action returns all bookSessions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookSession`;
  }

  update(id: number, updateBookSessionDto: UpdateBookSessionDto) {
    return `This action updates a #${id} bookSession`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookSession`;
  }
}
