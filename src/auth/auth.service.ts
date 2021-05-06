import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { JwtPayload } from './jwt-payload.interface';
import { AuthResponse } from './auth-response.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async signup(signupDto: SignupDto): Promise<AuthResponse> {
        const user = await this.userRepository.signup(signupDto);

        return this.handleAuthentication(user.emailAddress);
    }

    async login(loginDto: LoginDto): Promise<AuthResponse> {
        const emailAddress = await this.userRepository.validateUserPassword(loginDto);

        if (!emailAddress) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // const payload: JwtPayload = { emailAddress };
        // const accessToken = await this.jwtService.signAsync(payload);

        // return {
        //     accessToken,
        //     expiresIn: 3600,
        // };

        return this.handleAuthentication(emailAddress);
    }

    async handleAuthentication(emailAddress: string) {
        const payload: JwtPayload = { emailAddress };
        const accessToken = await this.jwtService.signAsync(payload);

        return {
            accessToken,
            expiresIn: 10,
        };
    }
}
