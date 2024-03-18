import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CreditCardValidatorService } from './creditCardValidator.service';
import { CreditCardController } from './creditcard.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, CreditCardController],
  providers: [AppService, CreditCardValidatorService],
})
export class AppModule {}
