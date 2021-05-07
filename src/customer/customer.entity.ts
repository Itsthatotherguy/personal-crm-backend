import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Customer {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    emailAddress: string;

    @Column()
    phoneNumber: string;

    @ManyToOne((type) => User, (user) => user.customers, { eager: false })
    user: User;

    @Column()
    userId: string;
}
