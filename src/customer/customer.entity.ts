import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Customer {
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  emailAddress: string;

  @Column()
  phoneNumber: string;
}
