import { Test, TestingModule } from '@nestjs/testing';
import { BookSessionsController } from './book-sessions.controller';
import { BookSessionsService } from './book-sessions.service';

describe('BookSessionsController', () => {
  let controller: BookSessionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookSessionsController],
      providers: [BookSessionsService],
    }).compile();

    controller = module.get<BookSessionsController>(BookSessionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
