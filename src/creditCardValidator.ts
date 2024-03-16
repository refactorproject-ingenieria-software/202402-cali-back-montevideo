import { error } from 'console';

type CreditCard = {
  cardNumber: string;
  expirationDate: string;
};
type CardValidatorResponse = {
  isValid: boolean;
  errors: string[];
};

export const creditCardValidator = ({
  cardNumber,
  expirationDate,
}: CreditCard): CardValidatorResponse => {
  const response: CardValidatorResponse = {
    isValid: true,
    errors: [],
  };

  const errorGenerator = (field: string, type: string): string => {
    return `${field} should be ${type}`;
  };

  if (typeof cardNumber !== 'string') {
    response.isValid = false;
    response.errors.push(errorGenerator('cardNumber', 'string'));
  }

  if (typeof expirationDate !== 'string') {
    response.isValid = false;
    response.errors.push(errorGenerator('expirationDate', 'string'));
  }

  return response;
};
