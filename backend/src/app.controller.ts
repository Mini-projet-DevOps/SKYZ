import { Controller, Get, Head } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Head()
  health() {
    return {
      status: 'ok',
      service: 'api running',
      timestamp: new Date().toISOString(),
    };
  }
}
