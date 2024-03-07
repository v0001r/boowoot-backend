import { Module } from '@nestjs/common';
import { FitnessPlansService } from './fitness-plans.service';
import { FitnessPlansController } from './fitness-plans.controller';

@Module({
  controllers: [FitnessPlansController],
  providers: [FitnessPlansService]
})
export class FitnessPlansModule {}
