import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { Connection } from 'mongoose';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';

import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { AuthRepository } from './repositories/auth.repository';
import { Auth, AuthSchema } from './entities/auth.entity';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Auth.name,
        schema: AuthSchema,
      },
    ]),
    
  ],
  providers: [
    AuthService, 
    JwtService,
    AuthRepository,
    LocalStrategy, 
    JwtStrategy, 
    JwtRefreshStrategy
  ],
  controllers: [AuthController]
})
export class AuthModule {}
