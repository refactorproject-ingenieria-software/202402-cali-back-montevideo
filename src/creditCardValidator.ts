type CreditCard = {
  cardNumber: string;
  expirationDate: string;
};
type CardValidatorResponse = {
  isValid: boolean;
  errors: string[];
};

const errorGenerator = (field: string, type: string): string => {
  return `${field} should be ${type}`;
};

export const creditCardValidator = ({
  cardNumber,
  expirationDate,
}: CreditCard): CardValidatorResponse => {
  const response: CardValidatorResponse = {
    isValid: true,
    errors: [],
  };

  if (typeof cardNumber !== 'string') {
    response.isValid = false;
    response.errors.push(errorGenerator('cardNumber', 'string'));
  }

  if (typeof expirationDate !== 'string') {
    response.isValid = false;
    response.errors.push(errorGenerator('expirationDate', 'string'));
  }

  if (cardNumber.length !== 16) {
    response.isValid = false;
    response.errors.push('The card must have at least 16 digits');
  }

  return response;
};
