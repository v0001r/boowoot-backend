import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import axios, { AxiosResponse } from 'axios';


import { AuthRepository } from '../repositories/auth.repository';
import { RegisterDto } from '../dto/register.dto';
import ForgotPasswordDto from '../dto/forgot-password.dto';
import ResetPasswordDto from '../dto/reset-password.dto';
import RegisterUserDto from '../dto/register-user.dto';
import ChangePasswordDto from '../dto/change-password.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly configService: ConfigService,
        private readonly authRepository: AuthRepository,
        private readonly jwtService: JwtService
    ) {}

    public getJwtAccessToken(userId: string) {
        const payload: TokenPayload = { userId };
        const token = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: `${this.configService.get('JWT_EXPIRATION_TIME')}s`
        })
        
        return token;
    }

    public getJwtRefreshToken(userId: string) {
        const payload: TokenPayload = { userId };
        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: `${this.configService.get('JWT_REFRESH_EXPIRATION_TIME')}s`
        })
        return refreshToken;
    }

    public async validate(username: string, pass: string) {
        try {
            const user = await this.authRepository.getByEmail(username);
            if (!user) {
                throw new HttpException('Staff does not exists', HttpStatus.BAD_REQUEST);
            }
            const isPasswordMatching =  await bcrypt.compare(pass, user.password);
            if (!isPasswordMatching) {
                throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
              }
            return user;
        } catch (error) {
            if (error?.response !== undefined
                || error?.response !== ''
                || error?.response !== null) {
                throw new HttpException(error.response, error.status)
            }
            throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST)
        }
    }

    async verifyPhone(phone: string){
        try {
            const user = await this.authRepository.getByPhone(phone);
            console.log(user)
            if (!user) {
                throw new HttpException('User does not exists', HttpStatus.BAD_REQUEST);
            }
            var otp = Math.floor(1000 + Math.random() * 9000);
            console.log('otp', otp);
            var id = user._id;
            const userUpdate = await this.authRepository.findOneAndUpdate(
                {
                  _id: id,
                },
                { $set: {otp: otp} },
            );
            return {id, otp};
        } catch (e){
            throw new HttpException(e.response, e.status)
        }
    }

    async verifyOtp(user: string, otp: string){
        const userData = await this.authRepository.findOne({
            _id: user,
            otp: otp
        });

        if(!userData)
        throw new HttpException('Invalid Otp or Wrong', HttpStatus.BAD_REQUEST);

        return userData;
    }
    async getProfile(id: string){

        console.log(id);
        const userData = await this.authRepository.findOne({
            _id: id  
        });

        if(!userData)
        throw new HttpException('Invalid user Id', HttpStatus.BAD_REQUEST);

        return userData;
    }

    async verifyToken(token: string){
        const decode = this.jwtService.verify(token);
        if(decode){
        const userData = await this.authRepository.findOne({
            _id: decode.userId,
        });
        if(!userData)
        throw new HttpException('Invalid Login', HttpStatus.BAD_REQUEST);

        return userData;
       }
       throw new HttpException('Invalid Login', HttpStatus.BAD_REQUEST);
    }

    async resendOtp(user: string){
        const userData = await this.authRepository.findOne({
            _id: user,
        });

        if(!userData)
        throw new HttpException('User Not forund', HttpStatus.BAD_REQUEST);

        return userData;
    }

    private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
        const isPasswordMatching = await bcrypt.compare(
            plainTextPassword,
            hashedPassword
        );
        if (!isPasswordMatching) {
          throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
    }

    async register(userData: RegisterDto) {
        try {
            //  check if user exist with given email id
            const user = await this.authRepository.getByEmail(userData.email);
            if(user) {
                throw new HttpException('User already exist with given email id', HttpStatus.BAD_REQUEST);
            }
            const usermobile = await this.authRepository.getByPhone(userData.mobile);
                        
            if(usermobile) {
                throw new HttpException('User already exist with given Mobile', HttpStatus.BAD_REQUEST);
            }

            await this.authRepository.create({
                ...userData,
                password: await bcrypt.hash(userData.password, 10)
            });
            return {success: true};
        } catch (error) {
            console.log(error);
            // if (error?.response !== undefined
            //     || error?.response !== ''
            //     || error?.response !== null) {
            //     throw new HttpException(error.response, error.status);
            // }
            throw new HttpException(error.response, error.status);
        }
    }

    async forgotPassword(body: ForgotPasswordDto) {
        try {
            // Check user exist or not
            const userData = await this.authRepository.getByEmail(body.email);
            if(!userData)
                throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);

            // Generate password reset token
            const payload: TokenPayload = { userId: userData._id };
            const token = this.jwtService.sign(payload, {
                secret: this.configService.get('JWT_SECRET'),
                expiresIn: `${this.configService.get('JWT_EXPIRATION_TIME')}s`
            });

            // Update user password reset token
            const auth = await this.authRepository.findOneAndUpdate({
                    _id: userData._id,
                }, { $set: {
                        password_reset_token: token,
                        password_reset_expires: Date.now() + 3600000 // 1 hour
                    }
                },
            );
            if (!auth)
                throw new HttpException('Error occured while updating.', HttpStatus.INTERNAL_SERVER_ERROR);

            // TODO: send user an email with reset url

            return {success: true};
        } catch(error) {
            throw new HttpException(error.response, error.status);
        }
    }

    async changePassword(data: ChangePasswordDto) {
            const userData = await this.authRepository.findOne({
                _id: data.id,
            });
            if(userData){
            //Compare Password
            const areEqual = await bcrypt.compare(data.old_password, userData.password);
            if (!areEqual)
                throw new HttpException("Wrong old password", HttpStatus.UNAUTHORIZED);

            // can't be same as old password
            if(data.old_password === data.new_password)
                throw new HttpException("Can't use your old password", HttpStatus.UNAUTHORIZED);

            // confirm passwords
            if(data.new_password !== data.conf_password)
                throw new HttpException("Both passwords does not match", HttpStatus.UNAUTHORIZED);

            let password = await bcrypt.hash(data.new_password, 10);
            await this.authRepository.findOneAndUpdate({
                _id: userData._id,
            }, { $set: {
                password: password,
                }
            },
            );
            return {success: true};
            }
        // Send user an email about password changed (to do)

    }
    
    async changeStatus(data) {
        const userData = await this.authRepository.findOne({
             ref_id: data.id,
        });
        if(userData){
            await this.authRepository.findOneAndUpdate({
                 _id: userData._id,
            },
            { $set: {
                status: data.status,
            }
            },
            );
        return {success: true};
        }
    }

    async resetPassword(body: ResetPasswordDto) {
        try {
            // Get user info with token
            const userData = await this.authRepository.findOne({
                password_reset_token: body.reset_token,
                password_reset_expires: { $gt: Date.now() }
            });
            if(!userData)
                throw new HttpException('Password reset token is invalid or has expired', HttpStatus.UNPROCESSABLE_ENTITY);

            if(body.password === body.conf_password) {
                // Update user password reset token
                await this.authRepository.findOneAndUpdate({
                        _id: userData._id,
                    }, { $set: {
                            password_reset_token: null,
                            password_reset_expires: null
                        }
                    },
                );

                // TODO: send user an email password has been changed

                return {success: true};
            }
        } catch(error) {
            throw new HttpException(error.response, error.status);
        }
    }

    async removeRefreshToken(userId: string) {
        const user = await this.authRepository.findOneAndUpdate(
            {
              _id: userId,
            },
            { $set: {refresh_token: null} },
        );

        if(!user)
            throw new HttpException('Error occured while updating.', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    async setCurrentRefreshToken(refreshToken: string, userId: number) {
        // console.log(userId);
        const user = await this.authRepository.findOneAndUpdate(
            {
              _id: userId,
            },
            { $set: {refresh_token: refreshToken} },
        );
        if(!user)
            throw new HttpException('Error occured while updating.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
