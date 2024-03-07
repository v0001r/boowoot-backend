import { Test, TestingModule } from '@nestjs/testing';
import { FitnessPlansController } from './fitness-plans.controller';
import { FitnessPlansService } from './fitness-plans.service';

describe('FitnessPlansController', () => {
  let controller: FitnessPlansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FitnessPlansController],
      providers: [FitnessPlansService],
    }).compile();

    controller = module.get<FitnessPlansController>(FitnessPlansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
