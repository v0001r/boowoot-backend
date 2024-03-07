import { Injectable } from '@nestjs/common';
import { CreateDietPlanDto } from './dto/create-diet-plan.dto';
import { UpdateDietPlanDto } from './dto/update-diet-plan.dto';

@Injectable()
export class DietPlansService {
  create(createDietPlanDto: CreateDietPlanDto) {
    return 'This action adds a new dietPlan';
  }

  findAll() {
    return `This action returns all dietPlans`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dietPlan`;
  }

  update(id: number, updateDietPlanDto: UpdateDietPlanDto) {
    return `This action updates a #${id} dietPlan`;
  }

  remove(id: number) {
    return `This action removes a #${id} dietPlan`;
  }
}
