import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthErrors } from './auth.errors';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }

    handleRequest(error, user) {
        if (error || !user) {
            throw error || new UnauthorizedException(AuthErrors.UNAUTHORIZED);
        }

        return user;
    }
}
