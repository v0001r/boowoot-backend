import { ConflictException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateFitnessPlanDto } from './dto/create-fitness-plan.dto';
import { UpdateFitnessPlanDto } from './dto/update-fitness-plan.dto';
import { FitnessPlanRepository } from './fitness-plans.repository';
import { FitnessPlan, FitnessPlanDocument } from './entities/fitness-plan.entity';

@Injectable()
export class FitnessPlansService {
  constructor(
    private readonly fitnessPlanRepository: FitnessPlanRepository,
    @InjectModel(FitnessPlan.name) private readonly fitnessPlanModel: Model<FitnessPlanDocument>,
) {}

  async create(body) {
    console.log(body.fitnessplans);
  try {
    let data = {
      'plan': body.plan,
      'amount': body.amount,
      'service': body.fitnessplans.service,
      'activity': body.fitnessplans.activity,
      'age': body.fitnessplans.age,
      'gender': body.fitnessplans.gender,
      'goal': body.fitnessplans.goal,
      'goalreach': body.fitnessplans.goalreach,
      'height': body.fitnessplans.height,
      'medical': body.fitnessplans.medical,
      'weight': body.fitnessplans.weight,
      'workpreference': body.fitnessplans.workpreference,
      'gymwork': body.fitnessplans.gymwork,
      'injury': body.fitnessplans.injury,
      'pain': body.fitnessplans.pain,
      'transaction_id': body.TransactionID,
      'user_id': body.user_id,
      'name': body.name,
      'email': body.email,
      'mobile': body.mobile,
  };
      const trainer = await this.fitnessPlanRepository.create({...data});
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

  const query = this.fitnessPlanModel.find(options);

  const items = await query.exec();
  return items;

}
}