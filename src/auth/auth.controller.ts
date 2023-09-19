import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import RequestWithUser from './requestWithUser.interface';
import JwtGuard from './jwt.guard';
import JwtRefreshGuard from './jwt-refresh-guard';

import { AuthService } from './auth.service';
import RegisterDto from './dto/register.dto';

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
    @UseGuards(JwtGuard)
    @Post('logout')
    async logOut(@Req() request: RequestWithUser) {
        await this.authService.removeRefreshToken(request.user._id);
        return {success: true}
    }
}
