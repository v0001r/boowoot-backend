import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService} from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import * as Joi from 'joi';

// Custom Validations
import { ValidateConfPasswordConstraint } from './common/validators/validate-confpassword';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainersModule } from './trainers/trainers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number(),
      })
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: 'mongodb://127.0.0.1:27017',
        dbName: 'boowoot-backend',
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    TrainersModule,
  ],
  controllers: [],
  providers: [
    ValidateConfPasswordConstraint,
  ],
})
export class AppModule {}
