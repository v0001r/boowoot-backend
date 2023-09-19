import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AuthRepository } from './auth.repository';
import { RegisterDto } from './dto/register.dto';

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
            secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
            expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}s`
        })
        return refreshToken;
    }

    public async validate(username: string, pass: string) {
        try {
            const user = await this.authRepository.getByEmail(username);
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

    async register(userData: RegisterDto) {
        try {
            //  check if user exist with given email id
            const user = await this.authRepository.getByEmail(userData.email);
            if(user) {
                throw new HttpException('User already exist with given email id', HttpStatus.UNPROCESSABLE_ENTITY);
            }

            await this.authRepository.create({
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
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
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
}
