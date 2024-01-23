import { Module } from '@nestjs/common';
import { TrainersService } from './trainers.service';
import { TrainersController } from './trainers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Trainer, TrainerSchema } from './entities/trainer.entity';
import { AuthRepository } from 'src/auth/repositories/auth.repository';
import { TrainerRepository } from './trainers.repository';
import { Auth, AuthSchema } from 'src/auth/entities/auth.entity';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Trainer.name,
        schema: TrainerSchema,
      },
      {
        name: Auth.name,
        schema: AuthSchema,
      },
    ]),
    FilesModule
  ],
  controllers: [TrainersController],
  providers: [TrainersService, AuthRepository, TrainerRepository,TrainersService]
})
export class TrainersModule {}
