import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { JwtPayload } from './jwt-payload.interface';
import { LoginResponse } from './login-response.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async signup(signupDto: SignupDto): Promise<void> {
        return this.userRepository.signup(signupDto);
    }

    async login(loginDto: LoginDto): Promise<LoginResponse> {
        const emailAddress = await this.userRepository.validateUserPassword(loginDto);

        if (!emailAddress) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload: JwtPayload = { emailAddress };
        const accessToken = await this.jwtService.signAsync(payload);

        return {
            accessToken,
        };
    }
}
