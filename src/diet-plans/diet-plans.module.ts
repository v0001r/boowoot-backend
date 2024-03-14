import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DietPlan, DietPlanSchema } from './entities/diet-plan.entity';
import { DietPlansController } from './diet-plans.controller';
import { DietPlansService } from './diet-plans.service';
import { DietPlanRepository } from './diet-plan.repository';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DietPlan.name,
        schema: DietPlanSchema,
      }
    ]),
  ],
  controllers: [DietPlansController],
  providers: [DietPlansService, DietPlanRepository]
})
export class DietPlansModule {}
