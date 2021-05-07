import { AbstractRepository, EntityRepository } from 'typeorm';
import { SignupDto } from './dto/signup.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { LoginDto } from './dto/login.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { AuthErrors } from './auth.errors';

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {
    async signup(signupDto: SignupDto): Promise<User> {
        const { name, emailAddress, password } = signupDto;

        const salt = await bcrypt.genSalt();

        const user = this.repository.create({
            id: uuid(),
            name,
            emailAddress,
            salt,
            password: await bcrypt.hash(password, salt),
        });

        try {
            await this.repository.save(user);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException(AuthErrors.DUPLICATE_EMAIL);
            } else {
                throw new InternalServerErrorException();
            }
        }

        return user;
    }

    async findUserByEmail(emailAddress: string): Promise<User> {
        return this.repository.findOne({ where: { emailAddress } });
    }

    async validateUserPassword(loginDto: LoginDto): Promise<string> {
        const { emailAddress, password } = loginDto;

        const user = await this.findUserByEmail(emailAddress);

        if (user && user.validatePassword(password)) {
            return user.emailAddress;
        } else {
            return null;
        }
    }
}
