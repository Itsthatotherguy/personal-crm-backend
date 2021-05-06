import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { LoginResponse } from './login-response.interface';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    async signUp(@Body(ValidationPipe) signupDto: SignupDto): Promise<void> {
        return this.authService.signup(signupDto);
    }

    @Post('/login')
    async login(@Body(ValidationPipe) loginDto: LoginDto): Promise<LoginResponse> {
        return this.authService.login(loginDto);
    }
}
