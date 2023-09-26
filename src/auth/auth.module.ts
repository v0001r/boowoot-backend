import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { Connection } from 'mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { DatabaseModule } from 'src/database/database.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';

import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { AuthRepository } from './repositories/auth.repository';
import { AuthSchema } from './entities/auth.entity';

export const TenantModelProviders = [
  {
    provide: 'Auth',
    useFactory: (connection: Connection) => connection.model('Auth', AuthSchema),
    inject: ['TENANT_CONNECTION'],
  },
];

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
            expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
        },
      }),
    }),
  ],
  providers: [
    AuthService, 
    AuthRepository,
    ...TenantModelProviders,
    LocalStrategy, 
    JwtStrategy, 
    JwtRefreshStrategy
  ],
  controllers: [AuthController]
})
export class AuthModule {}
