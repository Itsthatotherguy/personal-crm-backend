import { GraphQLModule } from '@nestjs/graphql';

export default GraphQLModule.forRoot({
  autoSchemaFile: true,
});
