import { Test, TestingModule } from '@nestjs/testing';
import { FitnessPlansService } from './fitness-plans.service';

describe('FitnessPlansService', () => {
  let service: FitnessPlansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FitnessPlansService],
    }).compile();

    service = module.get<FitnessPlansService>(FitnessPlansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
