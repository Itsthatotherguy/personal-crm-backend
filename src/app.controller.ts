import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    @Get()
    public healthcheck(): string {
        return 'Hello world!';
    }
}
