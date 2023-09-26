import { Body, Controller, HttpCode, HttpStatus, Post, Put, Req, UseGuards } from '@nestjs/common';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import JwtGuard from '../guards/jwt.guard';
import JwtRefreshGuard from '../guards/jwt-refresh-guard';

import { AuthUserService } from '../services/auth-user.service';
import ForgotPasswordDto from '../dto/forgot-password.dto';
import ResetPasswordDto from '../dto/reset-password.dto';
import RegisterUserDto from '../dto/register-user.dto';

@Controller('user-auth')
export class AuthUserController {
    constructor(
        private readonly authUserService: AuthUserService
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post('register')
    async register(@Body() body: RegisterUserDto) {
        await this.authUserService.register(body);
        return {success: true}
    }

    @HttpCode(HttpStatus.OK)
    @Post('forgot-password')
    async forgotPassword(@Body() body: ForgotPasswordDto) {
        return await this.authUserService.forgotPassword(body);
    }

    @HttpCode(HttpStatus.OK)
    @Put('rest-password')
    async resetPassword(@Body() body: ResetPasswordDto) {
        // return await this.authUserService.resetPassword(body);
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtGuard)
    @Post('logout')
    async logOut(@Req() request: RequestWithUser) {
        await this.authUserService.removeRefreshToken(request.user._id);
        return {success: true}
    }
}
