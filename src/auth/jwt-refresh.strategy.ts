import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AuthRepository } from './auth.repository';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh-token'
) {
    constructor(
        private readonly configService: ConfigService,
        private readonly authRepository: AuthRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_REFRESH_SECRET'),
            passReqToCallback: true,
        });
    }

    async validate(request: Request, payload: TokenPayload) {
        const authorization = request.get('Authorization');
        if(!authorization) return null;

        const refreshToken = authorization.replace('Bearer', '').trim();
        return this.authRepository.getIfRefreshTokenMatches(refreshToken, payload.userId);
    }
}