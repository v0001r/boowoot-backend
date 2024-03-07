import { Test, TestingModule } from '@nestjs/testing';
import { DietPlansService } from './diet-plans.service';

describe('DietPlansService', () => {
  let service: DietPlansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DietPlansService],
    }).compile();

    service = module.get<DietPlansService>(DietPlansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
