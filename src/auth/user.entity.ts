import { Column, Entity, OneToMany, PrimaryColumn, Unique } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Customer } from '../customer/customer.entity';

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

    @OneToMany((type) => Customer, (customer) => customer.user, { eager: true })
    customers: Customer[];

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);

        return hash === this.password;
    }
}
