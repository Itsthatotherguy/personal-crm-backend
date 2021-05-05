import { TypeOrmModule } from '@nestjs/typeorm';

export default TypeOrmModule.forRoot({
    type: 'mongodb',
    // url: 'mongodb+srv://root:7wHYH4Uke4hqPRhn@cluster0.xpxnc.mongodb.net/personal-crm?retryWrites=true&w=majority',
    url: 'mongodb://localhost/personal-crm',
    synchronize: true,
    useUnifiedTopology: true,
    autoLoadEntities: true,
});
