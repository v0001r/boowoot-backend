import { Body, Controller, HttpCode, HttpStatus, Post, Put, Req, UseGuards } from '@nestjs/common';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import JwtGuard from '../guards/jwt.guard';
import JwtRefreshGuard from '../guards/jwt-refresh-guard';

import { AuthService } from '../services/auth.service';
import RegisterDto from '../dto/register.dto';
import ForgotPasswordDto from '../dto/forgot-password.dto';
import ResetPasswordDto from '../dto/reset-password.dto';
import RegisterUserDto from '../dto/register-user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post('register')
    async register(@Body() body: RegisterDto) {
        await this.authService.register(body);
        return {success: true}
    }

    @HttpCode(HttpStatus.OK)
    @Post('forgot-password')
    async forgotPassword(@Body() body: ForgotPasswordDto) {
        return await this.authService.forgotPassword(body);
    }

    @HttpCode(HttpStatus.OK)
    @Put('rest-password')
    async resetPassword(@Body() body: ResetPasswordDto) {
        // return await this.authService.resetPassword(body);
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtGuard)
    @Post('logout')
    async logOut(@Req() request: RequestWithUser) {
        await this.authService.removeRefreshToken(request.user._id);
        return {success: true}
    }
}
