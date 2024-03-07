import { Module } from '@nestjs/common';
import { BookSessionsService } from './book-sessions.service';
import { BookSessionsController } from './book-sessions.controller';

@Module({
  controllers: [BookSessionsController],
  providers: [BookSessionsService]
})
export class BookSessionsModule {}
