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
  accessKeyId: '',
  secretAccessKey: '',
});
async create(body) {
    try {
      //  check if user exist with given email id
      const email = await this.authRepository.getEmail(body.email);
      if(email) {
          throw new HttpException('Trainer already exist with given email id', HttpStatus.BAD_REQUEST);
      }
      const phone = await this.authRepository.getByPhone(body.phone);
      if(phone) {
          throw new HttpException('Trainer already exist with given Phone', HttpStatus.BAD_REQUEST);
      }

      if(body.phone.length != 10){
        throw new HttpException('Phone number must be 10 digits', HttpStatus.BAD_REQUEST);

      }

      if(body.pin.length != 6){
        throw new HttpException('Pin code must be 6 digits', HttpStatus.BAD_REQUEST);

      }


      const otp = Math.floor(1000 + Math.random() * 9000);
      const traineData = {
        name: body.name,
        email: body.email,
        phone: body.phone,
        gender: body.gender,
        service_type: body.type,
        c_address: body.c_address,
        district: body.district,
        pin: body.pin,
        state: body.state,
        servicing_area: body.servicingArea,
        status: "P",
        kyc: '1',
        otp: otp.toString()
      }

      const data = {
          name: body.name,
          email: body.email,
          mobile: body.phone,
          user_type: 'T',
          kyc: '1',
      }

     const trainer =  await this.trainerRepository.create({...traineData});

     if(trainer){

       const userCreated = await this.authRepository.create({
        ...data,
        password: await bcrypt.hash(body.password, 10)
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
 async update(id: any, body, image ) {

    console.log(body);
    const update = {
      age: body.age,
      account_holder_name: body.account_holder_name,
      language: body.language,
      state: body.state,
      account_no: body.account_no,
      pin: body.pin,
      confirm_account_no: body.confirm_account_no,
      bank_name: body.bank_name,
      branch_name: body.branch_name,
      ifsc_code: body.ifsc_code,
      c_address: body.c_address,
      district: body.district,
      qualification: body.qualification,
      servicingArea: body.servicingArea,
      certificate: body.certificate,
      pan: body.pan,
      photo: body.photo,
      adhhar: body.adhhar,
      kyc: '2'
    }

    let auth = {
      kyc: 2
    };

    await this.trainerRepository.findOneAndUpdate(
      {
        ref_id: id,
      },
      { $set:update},
    );
    await this.authRepository.findOneAndUpdate(
      {
        _id: id,
      },
      { $set:auth},
    );
    // console.log(trainer);
    return {success: true};
    // return `This action updates a #${id} trainer`;
  }

  // remove(id: number) {
  //   return `This action removes a #${id} trainer`;
  // }
}
