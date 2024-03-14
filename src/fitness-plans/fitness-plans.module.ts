import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FitnessPlansService } from './fitness-plans.service';
import { FitnessPlansController } from './fitness-plans.controller';
import { FitnessPlan, FitnessPlanSchema } from './entities/fitness-plan.entity';
import { FitnessPlanRepository } from './fitness-plans.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FitnessPlan.name,
        schema: FitnessPlanSchema,
      }
    ]),
  ],
  controllers: [FitnessPlansController],
  providers: [FitnessPlansService, FitnessPlanRepository]
})
export class FitnessPlansModule {}
