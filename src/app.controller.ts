import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  passwordValidator(password: string) {
    if (typeof password !== 'string') {
      return false;
    }

    if (password.length < 8) {
      return 'Password must be at least 8 characters';
    }

    return true;
  }
}
