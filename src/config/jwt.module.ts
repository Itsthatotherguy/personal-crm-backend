import { JwtModule } from '@nestjs/jwt';

export default JwtModule.register({
    secret: 'secret51',
    signOptions: {
        expiresIn: 10,
    },
});
