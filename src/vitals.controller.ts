import { Controller, Get } from '@nestjs/common';
import { VitalsService } from './vitals.service';

@Controller('vitals')
export class VitalsController {
  constructor(private readonly vitalsService: VitalsService) {}

  @Get()
  getVitals(): string[] {
    return this.vitalsService.getSonarMetrics()[0];
  }
}
