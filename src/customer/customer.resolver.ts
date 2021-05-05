import { Query, Resolver } from '@nestjs/graphql';
import { CustomerType } from './customer.type';

@Resolver((of) => CustomerType)
export class CustomerResolver {
  @Query((returns) => CustomerType)
  public customers(): CustomerType {
    return {
      id: 'sdasasd',
      name: 'Chris vd Merwe',
      emailAddress: 'chrisvdm0410@gmail.com',
      phoneNumber: '0763072380',
    };
  }
}
