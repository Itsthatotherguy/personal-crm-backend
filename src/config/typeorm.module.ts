import { TypeOrmModule } from '@nestjs/typeorm';

export default TypeOrmModule.forRoot({
    type: 'mongodb',
    url: 'mongodb://localhost/personal-crm',
    synchronize: true,
    useUnifiedTopology: true,
    autoLoadEntities: true,
});
