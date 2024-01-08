import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AuthUserRepository } from '../repositories/auth-user.repository';
import ForgotPasswordDto from '../dto/forgot-password.dto';
import ResetPasswordDto from '../dto/reset-password.dto';
import RegisterUserDto from '../dto/register-user.dto';

@Injectable()
export class AuthUserService {
    constructor(
        private readonly configService: ConfigService,
        private readonly authUserRepository: AuthUserRepository,
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
            secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
            expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}s`
        })
        return refreshToken;
    }

    public async validate(username: string, pass: string) {
        try {
            const user = await this.authUserRepository.getByEmail(username);
            if (!user) {
                throw new HttpException('Staff does not exists', HttpStatus.BAD_REQUEST);
            }

            await this.verifyPassword(pass, user.password);

            // validate IPs for staff type users

            // Update user latest login data

            // const { password, ...result } = user;
            // return result;
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

    private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
        const isPasswordMatching = await bcrypt.compare(
            plainTextPassword,
            hashedPassword
        );
        if (!isPasswordMatching) {
          throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
    }

    async register(userData: RegisterUserDto) {
        try {
            let user;

            //  check if user exist with given email id
            user = await this.authUserRepository.getByEmail(userData.email);
            if(user) {
                throw new HttpException('User already exist with given email id', HttpStatus.BAD_REQUEST);
            }

            //  check if user exist with given mobile no
            user = await this.authUserRepository.getByMobile(userData.mobile);
            if(user) {
                throw new HttpException('User already exist with given mobile no', HttpStatus.BAD_REQUEST);
            }

            await this.authUserRepository.create({
                ...userData,
                password: await bcrypt.hash(userData.password, 10)
            });
            return {success: true};
        } catch (error) {
            // console.log(error);
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
            const userData = await this.authUserRepository.getByEmail(body.email);
            if(!userData)
                throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);

            // Generate password reset token
            const payload: TokenPayload = { userId: userData._id };
            const token = this.jwtService.sign(payload, {
                secret: this.configService.get('JWT_SECRET'),
                expiresIn: `${this.configService.get('JWT_EXPIRATION_TIME')}s`
            });

            // Update user password reset token
            const auth = await this.authUserRepository.findOneAndUpdate({
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

    async resetPassword(body: ResetPasswordDto) {
        try {
            // Get user info with token
            const userData = await this.authUserRepository.findOne({
                password_reset_token: body.reset_token,
                password_reset_expires: { $gt: Date.now() }
            });
            if(!userData)
                throw new HttpException('Password reset token is invalid or has expired', HttpStatus.UNPROCESSABLE_ENTITY);

            if(body.password === body.conf_password) {
                // Update user password reset token
                await this.authUserRepository.findOneAndUpdate({
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
        const user = await this.authUserRepository.findOneAndUpdate(
            {
              _id: userId,
            },
            { $set: {refresh_token: null} },
        );

        if(!user)
            throw new HttpException('Error occured while updating.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
