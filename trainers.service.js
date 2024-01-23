"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const trainers_repository_1 = require("./trainers.repository");
const auth_repository_1 = require("../auth/repositories/auth.repository");
const trainer_entity_1 = require("./entities/trainer.entity");
const AWS = require("aws-sdk");
let TrainersService = class TrainersService {
    constructor(trainerRepository, authRepository, trainerModel) {
        this.trainerRepository = trainerRepository;
        this.authRepository = authRepository;
        this.trainerModel = trainerModel;
        this.AWS_S3_BUCKET = 'bowoot-images';
        this.s3 = new AWS.S3({
            accessKeyId: 'AKIAW3MED4D64A4TWK2I',
            secretAccessKey: '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',
        });
    }
    async create(createTrainerDto) {
        try {
            const email = await this.authRepository.getEmail(createTrainerDto.email);
            if (email) {
                throw new common_1.HttpException('Trainer already exist with given email id', common_1.HttpStatus.BAD_REQUEST);
            }
            const phone = await this.authRepository.getByPhone(createTrainerDto.phone);
            if (phone) {
                throw new common_1.HttpException('Trainer already exist with given Phone', common_1.HttpStatus.BAD_REQUEST);
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
            };
            const data = {
                name: createTrainerDto.name,
                email: createTrainerDto.email,
                mobile: createTrainerDto.phone,
                user_type: 'T'
            };
            const trainer = await this.trainerRepository.create(Object.assign({}, traineData));
            if (trainer) {
                const userCreated = await this.authRepository.create(Object.assign(Object.assign({}, data), { password: await bcrypt.hash(createTrainerDto.password, 10) }));
                if (userCreated) {
                    const update = {
                        ref_id: userCreated._id
                    };
                    await this.trainerRepository.findOneAndUpdate({
                        _id: trainer._id,
                    }, { $set: update });
                }
            }
            return { success: true };
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException(error.response, error.status);
        }
    }
    async find(params = {}) {
        const { s, page, limit, offset, sortBy, sortDir } = params;
        const options = {};
        if (s) {
            options.$or = [
                { name: new RegExp(s, 'i') },
                { email: new RegExp(s, 'i') },
                { phone: new RegExp(s, 'i') }
            ];
        }
        const sort = { createdAt: 'desc' };
        if (sortBy) {
            sort[sortBy] = sortDir || 'asc';
        }
        const query = this.trainerModel.find(options);
        const items = await query.exec();
        return items;
    }
    async findOne(id) {
        const leave = await this.authRepository.findOne({ _id: id });
        if (!leave) {
            throw new common_1.NotFoundException();
        }
        else {
            const trainer = await this.trainerRepository.findOne({ email: leave.email });
            return trainer;
        }
    }
    async approve(body) {
        const update = {
            status: "A"
        };
        await this.trainerRepository.findOneAndUpdate({
            ref_id: body.id,
        }, { $set: update });
        return { success: true };
    }
    async block(body) {
        const update = {
            block_status: "Block"
        };
        await this.trainerRepository.findOneAndUpdate({
            ref_id: body.id,
        }, { $set: update });
        return { success: true };
    }
    async unblock(body) {
        const update = {
            block_status: "Unblock"
        };
        await this.trainerRepository.findOneAndUpdate({
            ref_id: body.id,
        }, { $set: update });
        return { success: true };
    }
    async reject(body) {
        const update = {
            status: "R"
        };
        await this.trainerRepository.findOneAndUpdate({
            ref_id: body.id,
        }, { $set: update });
        return { success: true };
    }
    async upload(file) {
        const { originalname } = file;
        return await this.s3_upload(file.buffer, this.AWS_S3_BUCKET, originalname, file.mimetype);
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
        }
        catch (e) {
            console.log(e);
        }
    }
};
exports.TrainersService = TrainersService;
exports.TrainersService = TrainersService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_1.InjectModel)(trainer_entity_1.Trainer.name)),
    __metadata("design:paramtypes", [trainers_repository_1.TrainerRepository,
        auth_repository_1.AuthRepository,
        mongoose_2.Model])
], TrainersService);
//# sourceMappingURL=trainers.service.js.map