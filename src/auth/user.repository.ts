import { AbstractRepository, EntityRepository } from 'typeorm';
import { SignupDto } from './dto/signup.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { LoginDto } from './dto/login.dto';

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {
    async signup(signupDto: SignupDto): Promise<void> {
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
            console.log(error);
        }
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
