import { Injectable } from '@nestjs/common';
import { CreateFitnessPlanDto } from './dto/create-fitness-plan.dto';
import { UpdateFitnessPlanDto } from './dto/update-fitness-plan.dto';

@Injectable()
export class FitnessPlansService {
  create(createFitnessPlanDto: CreateFitnessPlanDto) {
    return 'This action adds a new fitnessPlan';
  }

  findAll() {
    return `This action returns all fitnessPlans`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fitnessPlan`;
  }

  update(id: number, updateFitnessPlanDto: UpdateFitnessPlanDto) {
    return `This action updates a #${id} fitnessPlan`;
  }

  remove(id: number) {
    return `This action removes a #${id} fitnessPlan`;
  }
}
