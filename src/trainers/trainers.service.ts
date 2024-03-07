import { ConflictException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { TrainerRepository } from './trainers.repository';
import { AuthRepository } from 'src/auth/repositories/auth.repository';
import { Trainer, TrainerDocument } from './entities/trainer.entity';
import * as AWS from 'aws-sdk';

@Injectable()
export class TrainersService {

  constructor(
    private readonly trainerRepository: TrainerRepository,
    private readonly authRepository: AuthRepository,

    @InjectModel(Trainer.name) private readonly trainerModel: Model<TrainerDocument>,


) {}
AWS_S3_BUCKET = 'bowoot-images';
s3 = new AWS.S3({
  accessKeyId: 'AKIAW3MED4D62VFI7WFZ',
  secretAccessKey: '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',
});
async create(createTrainerDto: CreateTrainerDto) {
    try {
      //  check if user exist with given email id
      const email = await this.authRepository.getEmail(createTrainerDto.email);
      if(email) {
          throw new HttpException('Trainer already exist with given email id', HttpStatus.BAD_REQUEST);
      }
      const phone = await this.authRepository.getByPhone(createTrainerDto.phone);
      if(phone) {
          throw new HttpException('Trainer already exist with given Phone', HttpStatus.BAD_REQUEST);
      }


      const otp = Math.floor(1000 + Math.random() * 9000);
      const traineData = {
        name: createTrainerDto.name,
        email: createTrainerDto.email,
        phone: createTrainerDto.phone,
        gender: createTrainerDto.gender,
        age: createTrainerDto.age,
        language: createTrainerDto.language,
        state: createTrainerDto.state,
        account_holder_name: createTrainerDto.account_holder_name,
        account_no: createTrainerDto.account_no,
        confirm_account_no: createTrainerDto.confirm_account_no,
        bank_name: createTrainerDto.bank_name,
        branch_name: createTrainerDto.branch_name,
        ifsc_code: createTrainerDto.ifsc_code,
        c_address: createTrainerDto.c_address,
        district: createTrainerDto.district,
        qualification: createTrainerDto.qualification,
        service_type: createTrainerDto.serviceType,
        servicing_area: createTrainerDto.servicingArea,
        pin: createTrainerDto.pin,
        documents: Object.values(createTrainerDto.documents),
        status: "P",
        otp: otp.toString()
      }

      const data = {
          name: createTrainerDto.name,
          email: createTrainerDto.email,
          mobile: createTrainerDto.phone,
          user_type: 'T'
      }

     const trainer =  await this.trainerRepository.create({...traineData});

     if(trainer){

       const userCreated = await this.authRepository.create({
        ...data,
        password: await bcrypt.hash(createTrainerDto.password, 10)
       });

       if(userCreated){

        const update = {
          ref_id: userCreated._id
        }

        await this.trainerRepository.findOneAndUpdate(
          {
            _id: trainer._id,
          },
          { $set:update},
        );
       }
     }
      return {success: true};
  } catch (error) {
      console.log(error);
      throw new HttpException(error.response, error.status);
  }
  }

  
async find(params: any = {}) {
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

  const query = this.trainerModel.find(options);

  const items = await query.exec();
  return items;
}


async findOne(id: string) {
  const leave = await this.authRepository.findOne({_id: id});
  if (!leave){ throw new NotFoundException();}else{
    const trainer = await this.trainerRepository.findOne({email: leave.email});
    
    // console.log(trainer);
    return trainer;
  }

}


async approve(body){
  
    const update = {
      status: "A"
    }

    await this.trainerRepository.findOneAndUpdate(
      {
        ref_id: body.id,
      },
      { $set:update},
    );
    // console.log(trainer);
    return {success: true};
  }
async block(body){
  
    const update = {
      block_status: "Block"
    }

    await this.trainerRepository.findOneAndUpdate(
      {
        ref_id: body.id,
      },
      { $set:update},
    );
    // console.log(trainer);
    return {success: true};
  }
async unblock(body){
  
    const update = {
      block_status: "Unblock"
    }

    await this.trainerRepository.findOneAndUpdate(
      {
        ref_id: body.id,
      },
      { $set:update},
    );
    // console.log(trainer);
    return {success: true};
  }

async reject(body){
  
    const update = {
      status: "R"
    }

    await this.trainerRepository.findOneAndUpdate(
      {
        ref_id: body.id,
      },
      { $set:update},
    );
    // console.log(trainer);
    return {success: true};
  }

  async upload(file) {
    // console.log(file);
    const { originalname } = file;

    return await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      originalname,
      file.mimetype,
    );
  }

  async s3_upload(file, bucket, name, mimetype) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1',
      },
    };

    try {
      let s3Response = await this.s3.upload(params).promise();
      return s3Response.Location;
    } catch (e) {
      console.log(e);
    }
  }
  // update(id: number, updateTrainerDto: UpdateTrainerDto) {
  //   return `This action updates a #${id} trainer`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} trainer`;
  // }
}
