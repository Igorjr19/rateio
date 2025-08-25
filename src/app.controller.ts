import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { Public } from './decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health-check')
  @Public()
  getHello(): string {
    return this.appService.healthCheck();
  }
}
