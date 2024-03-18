import { Injectable, Param } from '@nestjs/common';
import {
  CardValidatorResponse,
  CreditCard,
  CreditCardFieldType,
} from './types';
import { creditCardValidator } from './creditCardValidator';

@Injectable()
export class CreditCardValidatorService {
  validateCreditCard(
    @Param('cardNumber') cardNumber: CreditCardFieldType<'cardNumber'>,
    @Param('expirationDate')
    expirationDate: CreditCardFieldType<'expirationDate'>,
  ): CardValidatorResponse {
    const inputCreditCard: CreditCard = { cardNumber, expirationDate };
    return creditCardValidator(inputCreditCard);
  }
}
