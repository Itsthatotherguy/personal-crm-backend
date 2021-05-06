import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { AuthResponse } from './auth-response.interface';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    async signUp(@Body(ValidationPipe) signupDto: SignupDto): Promise<AuthResponse> {
        console.log(signupDto);
        return this.authService.signup(signupDto);
    }

    @Post('/login')
    async login(@Body(ValidationPipe) loginDto: LoginDto): Promise<AuthResponse> {
        return this.authService.login(loginDto);
    }
}
