import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService} from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import * as Joi from 'joi';

// Custom Validations
import { ValidateConfPasswordConstraint } from './common/validators/validate-confpassword';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number(),
        MONGO_DB_CONNECTION: Joi.string().required(),
        MONGO_DB_NAME: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
        JWT_REFRESH_EXPIRATION_TIME: Joi.string().required(),
      })
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGO_DB_CONNECTION'),
        dbName: configService.get('MONGO_DB_NAME'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [
    ValidateConfPasswordConstraint,
  ],
})
export class AppModule {}
