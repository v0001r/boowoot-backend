import { Module } from '@nestjs/common';
import { DietPlansService } from './diet-plans.service';
import { DietPlansController } from './diet-plans.controller';

@Module({
  controllers: [DietPlansController],
  providers: [DietPlansService]
})
export class DietPlansModule {}
