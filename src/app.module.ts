import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VitalsController } from './vitals.controller';
import { VitalsService } from './vitals.service';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [AppController, VitalsController],
  providers: [AppService, VitalsService],
})
export class AppModule {}
