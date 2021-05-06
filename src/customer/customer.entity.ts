import { Column, Entity, PrimaryColumn } from 'typeorm';

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
}
