import { Column, Entity, PrimaryColumn, Unique } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['emailAddress'])
export class User {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    emailAddress: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);

        return hash === this.password;
    }
}
