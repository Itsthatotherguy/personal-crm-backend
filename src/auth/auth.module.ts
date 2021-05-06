import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { UserRepository } from './user.repository';
import { AuthService } from './auth.service';

import PassportModule from '../config/passport.module';
import JwtModule from '../config/jwt.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [PassportModule, JwtModule, TypeOrmModule.forFeature([UserRepository])],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
