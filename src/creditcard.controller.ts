import { Controller, Get, Param } from '@nestjs/common';
import { CardValidatorResponse, CreditCardFieldType } from './types';
import { CreditCardValidatorService } from './creditCardValidator.service';

@Controller('credit-card')
export class CreditCardController {
  constructor(private readonly creditCardService: CreditCardValidatorService) {}

  @Get(':cardNumber/:expirationDate')
  validateCreditCard(
    @Param('cardNumber') cardNumber: CreditCardFieldType<'cardNumber'>,
    @Param('expirationDate')
    expirationDate: CreditCardFieldType<'expirationDate'>,
  ): CardValidatorResponse {
    return this.creditCardService.validateCreditCard(
      cardNumber,
      expirationDate,
    );
  }
}
