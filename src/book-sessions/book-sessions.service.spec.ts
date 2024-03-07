import { Test, TestingModule } from '@nestjs/testing';
import { BookSessionsService } from './book-sessions.service';

describe('BookSessionsService', () => {
  let service: BookSessionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookSessionsService],
    }).compile();

    service = module.get<BookSessionsService>(BookSessionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
