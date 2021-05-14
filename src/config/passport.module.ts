import { IAuthModuleOptions } from '@nestjs/passport';

export const passportConfigOptions: IAuthModuleOptions<any> = {
    defaultStrategy: 'jwt',
};
