import { ConflictException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateDietPlanDto } from './dto/create-diet-plan.dto';
import { UpdateDietPlanDto } from './dto/update-diet-plan.dto';
import { DietPlan, DietPlanDocument } from './entities/diet-plan.entity';
import { DietPlanRepository } from './diet-plan.repository';

@Injectable()
export class DietPlansService {

  constructor(
    private readonly dietPlanRepository: DietPlanRepository,
    @InjectModel(DietPlan.name) private readonly dietPlanModel: Model<DietPlanDocument>,


) {}

async create(body) {
  console.log(body.trainerservice);
  try {
      let data = {
          'plan': body.plan,
          'amount': body.amount,
          'service': body.trainerservice.service,
          'activity': body.trainerservice.activity,
          'age': body.trainerservice.age,
          'gender': body.trainerservice.gender,
          'goal': body.trainerservice.goal,
          'height': body.trainerservice.height,
          'medical': body.trainerservice.medical,
          'weight': body.trainerservice.weight,
          'diet': body.trainerservice.diet,
          'period': body.trainerservice.period,
          'transaction_id': body.TransactionID,
          'user_id': body.user_id,
          'name': body.name,
          'email': body.email,
          'mobile': body.mobile,
      };
      const trainer = await this.dietPlanRepository.create({...data});
      if (trainer) {
          return { success: true, statusCode: 200 };
      }
  }
  catch (error) {
    console.log(error);
    throw new HttpException(error.response, error.status);
  }
}

  async findAll(params: any = {}) {
    const { s, page, limit, offset, sortBy, sortDir} = params;

  const options: any = {};

  // Build the common search keywords with a $or operator
  if (s) {
    options.$or = [
      { name: new RegExp(s, 'i') },
      { email: new RegExp(s, 'i') },
      { phone: new RegExp(s, 'i') }
    ];
  }
  const sort: any = { createdAt: 'desc' };
  if (sortBy) {
    sort[sortBy] = sortDir || 'asc';
  }

  const query = this.dietPlanModel.find(options);

  const items = await query.exec();
  return items;
  }

}
