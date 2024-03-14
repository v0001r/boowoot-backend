import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/common/database/entity.repository.base';
import { InjectModel } from '@nestjs/mongoose';
import { FitnessPlan, FitnessPlanDocument } from './entities/fitness-plan.entity';

@Injectable()
export class FitnessPlanRepository extends EntityRepository<FitnessPlanDocument> {
  constructor(
    @InjectModel(FitnessPlan.name)
    private readonly fitnessPlanModel: Model<FitnessPlanDocument>,
  ) {
    super(fitnessPlanModel);
  }


}
