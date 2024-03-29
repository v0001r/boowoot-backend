import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService} from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import * as Joi from 'joi';

// Custom Validations
import { ValidateConfPasswordConstraint } from './common/validators/validate-confpassword';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainersModule } from './trainers/trainers.module';
import { FilesModule } from './files/files.module';
import { CorporateEnquiryModule } from './corporate-enquiry/corporate-enquiry.module';
import { NeoEnquiryModule } from './neo-enquiry/neo-enquiry.module';
import { DietPlansModule } from './diet-plans/diet-plans.module';
import { FitnessPlansModule } from './fitness-plans/fitness-plans.module';
import { BookSessionsModule } from './book-sessions/book-sessions.module';
import { ReviewsModule } from './reviews/reviews.module';
import { MailModule } from './mail/mail.module';

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
    FilesModule,
    CorporateEnquiryModule,
    NeoEnquiryModule,
    DietPlansModule,
    FitnessPlansModule,
    BookSessionsModule,
    ReviewsModule,
    MailModule
  ],
  controllers: [],
  providers: [
    ValidateConfPasswordConstraint,
  ],
})
export class AppModule {}
