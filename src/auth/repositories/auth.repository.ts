import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/common/database/entity.repository.base';
import { AuthDocument } from '../entities/auth.entity';

@Injectable()
export class AuthRepository extends EntityRepository<AuthDocument> {
  constructor(
    @Inject('Auth') private readonly authModel: Model<AuthDocument>,
  ) {
    super(authModel);
  }

  async getById(_id: string) {
    let user;
    try {
      user = await this.authModel.findOne({ _id, status: true }, 'title status email').exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return user;
  }

  async getByEmail(email: string) {
    let user;
    try {
      user = await this.authModel.findOne({ email, status: true }, 'title status email').exec();
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

    if (isRefreshTokenMatching) {
      return user;
    }
  }
}