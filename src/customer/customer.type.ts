import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Customer')
export class CustomerType {
  @Field((type) => ID, { nullable: false })
  id: string;

  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  emailAddress: string;

  @Field({ nullable: false })
  phoneNumber: string;
}
