import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import * as config from 'config';

const jwtConfig: any = config.get('jwt');

export const jwtConfigOptions: JwtModuleOptions = {
    secret: process.env.JWT_SECRET || jwtConfig.secret,
    signOptions: {
        expiresIn: jwtConfig.expiresIn,
    },
};
