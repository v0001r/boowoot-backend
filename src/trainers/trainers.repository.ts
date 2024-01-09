import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/common/database/entity.repository.base';
import { InjectModel } from '@nestjs/mongoose';
import { Trainer, TrainerDocument } from './entities/trainer.entity';

@Injectable()
export class TrainerRepository extends EntityRepository<TrainerDocument> {
  constructor(
    @InjectModel(Trainer.name)
    private readonly trainerModel: Model<TrainerDocument>,
  ) {
    super(trainerModel);
  }

  async getById(_id: string) {
    let user;
    try {
      user = await this.trainerModel.findOne({ _id }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return user;
  }

  async getByEmail(email: string) {
    let user;
    try {
      user = await this.trainerModel.findOne({ email}).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return user;
  }

  async getByPhone(phone: string) {
    let user;
    try {
      user = await this.trainerModel.findOne({ phone }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return user;
  }

}
