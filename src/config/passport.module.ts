import { PassportModule } from '@nestjs/passport';

export default PassportModule.register({
    defaultStrategy: 'jwt',
});
