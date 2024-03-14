import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/common/database/entity.repository.base';
import { InjectModel } from '@nestjs/mongoose';
import { DietPlan, DietPlanDocument } from './entities/diet-plan.entity';

@Injectable()
export class DietPlanRepository extends EntityRepository<DietPlanDocument> {
  constructor(
    @InjectModel(DietPlan.name)
    private readonly dietPlanModel: Model<DietPlanDocument>,
  ) {
    super(dietPlanModel);
  }

}
