import { TypeOrmModule } from '@nestjs/typeorm';

export default TypeOrmModule.forRoot({
    type: 'postgres',
    username: 'postgres',
    password: 'postgres',
    database: 'personal-crm',
    port: 5432,
    synchronize: true,
    autoLoadEntities: true,
});
