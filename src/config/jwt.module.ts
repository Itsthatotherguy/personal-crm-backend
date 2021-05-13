import { JwtModule } from '@nestjs/jwt';
import * as config from 'config';

const jwtConfig: any = config.get('jwt');

export default JwtModule.register({
    secret: process.env.JWT_SECRET || jwtConfig.secret,
    signOptions: {
        expiresIn: jwtConfig.expiresIn,
    },
});
