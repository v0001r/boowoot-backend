import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/common/database/entity.repository.base';
import { AuthUserDocument } from '../entities/auth-user.entity';

@Injectable()
export class AuthUserRepository extends EntityRepository<AuthUserDocument> {
  constructor(
    @Inject('AuthUser') private readonly authUserModel: Model<AuthUserDocument>,
  ) {
    super(authUserModel);
  }

  async getById(_id: string) {
    let user;
    try {
      user = await this.authUserModel.findOne({ _id, status: true }, 'status email').exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return user;
  }

  async getByMobile(mobile: string) {
    let user;
    try {
      user = await this.authUserModel.findOne({ mobile, status: true }, 'status mobile').exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return user;
  }

  async getByEmail(email: string) {
    let user;
    try {
      user = await this.authUserModel.findOne({ email, status: true }, 'status email').exec();
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