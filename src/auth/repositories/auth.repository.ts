import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/common/database/entity.repository.base';
import { Auth, AuthDocument } from '../entities/auth.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthRepository extends EntityRepository<AuthDocument> {
  constructor(
    @InjectModel(Auth.name)
    private readonly authModel: Model<AuthDocument>,
  ) {
    super(authModel);
  }

  async getById(_id: string) {
    let user;
    try {
      user = await this.authModel.findOne({ _id, status: true }, 'title status email mobile refresh_token').exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return user;
  }

  async getByEmail(email: string, user_type: string) {
    let user;
    try {
      user = await this.authModel.findOne({ email, status: true, user_type: user_type}, '_id status user_type email mobile password refresh_token').exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return user;
  }
  async getEmail(email: string) {
    let user;
    try {
      user = await this.authModel.findOne({ email, status: true}, '_id status user_type email mobile password refresh_token').exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return user;
  }
  async getByPhone(mobile: string) {
    let user;
    try {
      user = await this.authModel.findOne({ mobile, status: true }, '_id status email user_type mobile password refresh_token').exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return user;
  }

  async getIfRefreshTokenMatches(refreshToken: string, userId: string) {
    const user = await this.getById(userId);
    let isRefreshTokenMatching = false;
    if(user.refresh_token !== null) {
       isRefreshTokenMatching = await bcrypt.compare(
        refreshToken,
        user.refresh_token
      );
    }
    
    console.log(isRefreshTokenMatching);

    if (isRefreshTokenMatching) {
      return user;
    }
  }
}
