import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import JwtGuard from '../guards/jwt.guard';
import JwtRefreshGuard from '../guards/jwt-refresh-guard';
import axios , { AxiosRequestConfig } from 'axios';

import { AuthService } from '../services/auth.service';
import RegisterDto from '../dto/register.dto';
import ForgotPasswordDto from '../dto/forgot-password.dto';
import ResetPasswordDto from '../dto/reset-password.dto';
import RegisterUserDto from '../dto/register-user.dto';
import ParamsWithId from 'src/common/params-with-id';
import ChangePasswordDto from '../dto/change-password.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @HttpCode(HttpStatus.OK)
    @Get('')
    async apiCheck() {
        return {all: 'ok'}
    }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    async register(@Body() body: RegisterDto) {
        
        return await this.authService.register(body);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() request) {
        const user = await this.authService.validate(request.username, request.password);
        if(user){
        const accessToken = this.authService.getJwtAccessToken(user._id.toString());
        const refreshToken = this.authService.getJwtRefreshToken(user._id.toString());
        
        await this.authService.setCurrentRefreshToken(refreshToken, user._id.toString());
        return {
            token: accessToken,
            refresh_token: refreshToken,
            userId: user._id.toString(),
            user_type: user.user_type.toString(),
            email: user.email.toString(),
            mobile: user.mobile.toString(),
            status: user.status.toString(),
        };
    }
       return {'status': 400, 'message': 'something went wrong'};
    }

    @HttpCode(HttpStatus.OK)
    @Post('opt-login')
    async otpLogin(@Body() request) {
        const user = await this.authService.verifyPhone(request.mobile);
        if(user){
            var  data = {
                mobile: '91'+request.mobile,
                otp: user.otp,
            }
            const options = {
                method: 'POST',
                url: 'https://control.msg91.com/api/v5/flow/',
                headers: {
                  accept: 'application/json',
                  'content-type': 'application/json',
                  authkey: '317054AHQrBOCY5e3c27d8P1'
                },
                data: {
                  template_id: '62a853ec1158082d2e7f638b',
                  short_url: '0',
                  recipients: [data]
                }
              };
              await axios.request(options).then(function (response) {
                 console.log(response);
                }).catch(function (error) {
                  console.error(error);
                });
        // const accessToken = this.authService.getJwtAccessToken(user._id.toString());
        // const refreshToken = this.authService.getJwtRefreshToken(user._id.toString());
        
        // await this.authService.setCurrentRefreshToken(refreshToken, user._id.toString());
        return {
            status: 200,
            message: 'OTP sent to mobile',
            userId: user.id.toString()
        };
    }
       return {'status': 400, 'message': 'something went wrong'};
    }

    @HttpCode(HttpStatus.OK)
    @Post('otp-verify')
    async otpVerify(@Body() body) {
        const user = await this.authService.verifyOtp(body.id, body.otp);

        if(user){
            const accessToken = this.authService.getJwtAccessToken(user._id.toString());
            const refreshToken = this.authService.getJwtRefreshToken(user._id.toString());
            
            await this.authService.setCurrentRefreshToken(refreshToken, user._id.toString());
            return {
                token: accessToken,
                refresh_token: refreshToken,
                userId: user._id.toString()
            };
        }
        
        return {'status': 400, 'message': 'something went wrong'};
    }

    @HttpCode(HttpStatus.OK)
    @Post('change-password')
    async changePassword(@Body() body: ChangePasswordDto) {
        return await this.authService.changePassword(body)
    }


    // @HttpCode(HttpStatus.OK)
    // @Get('profile')
    // async getProfile(@Body() body) {
    //     const user = await this.authService.getProfile(body.userId);

    //     if(user){
    //         const data = {
    //             id: user._doc._id.toString(),
    //             email: user._doc.email,
    //             mobile: user._doc.mobile,
    //             status: user._doc.status
    //         }
    //         return data;
    //     }
        
    //     return {'status': 400, 'message': 'something went wrong'};
    // }


    @Get(':id')
    async findOne(@Param('id') id : string) {
    const user = await this.authService.getProfile(id);
      if(user){
        const data = {
            id: user._id.toString(),
            email: user.email,
            mobile: user.mobile,
            status: user.status,
        }
        return data;
    }
    return {'status': 400, 'message': 'something went wrong'};
      
    }

    @HttpCode(HttpStatus.OK)
    @Post('resend-otp')
    async resendOtp(@Body() body) {
        const user = await this.authService.resendOtp(body.id);
        if(user){
            var  data = {
                mobile: '91'+user.mobile,
                otp: user.otp,
            }
            const options = {
                method: 'POST',
                url: 'https://control.msg91.com/api/v5/flow/',
                headers: {
                  accept: 'application/json',
                  'content-type': 'application/json',
                  authkey: '317054AHQrBOCY5e3c27d8P1'
                },
                data: {
                  template_id: '62a853ec1158082d2e7f638b',
                  short_url: '0',
                  recipients: [data]
                }
              };
              await axios.request(options).then(function (response) {
                 console.log(response);
                }).catch(function (error) {
                  console.error(error);
                });

        return {
            status: 200,
            message: 'OTP Resent to mobile',
            userId: user._id.toString()
        };
    }

    }

    @HttpCode(HttpStatus.OK)
    @Post('verify-token')
    async verifyToken(@Body() body) {
        const user = await this.authService.verifyToken(body.token);
        if(user){
            return {
                success: true,
                userId: user._id.toString()
            };
        }
    }

    @HttpCode(HttpStatus.OK)
    @Post('change-status')
    async chnageStatus(@Body() body) {
        const user = await this.authService.changeStatus(body);
        if(user){
            return {success: true,};
        }
        return {'status': 400, 'message': 'something went wrong'};
    }

    @Post('refresh')
    async refresh(@Body() body) {        
        return {
            token: this.authService.getJwtAccessToken(body.id)
        };
    }


    @HttpCode(HttpStatus.OK)
    @Post('forgot-password')
    async forgotPassword(@Body() body: ForgotPasswordDto) {
        return await this.authService.forgotPassword(body);
    }

    @HttpCode(HttpStatus.OK)
    @Put('reset-password')
    async resetPassword(@Body() body: ResetPasswordDto) {
        return await this.authService.resetPassword(body);
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtGuard)
    @Post('logout')
    async logOut(@Req() request: RequestWithUser) {
        await this.authService.removeRefreshToken(request.user._id);
        return {success: true}
    }
}
