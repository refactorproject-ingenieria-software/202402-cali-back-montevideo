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

const isValidCardNumberByLuhn = (cardNumber): boolean => {
  let checkSum = 0;
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    const isEven = i % 2 === 0;
    const currentDigit = cardNumber.charAt(i);
    let numberDigit = parseInt(currentDigit, 10);
    if (isEven && (numberDigit *= 2) > 9) numberDigit -= 9;

    checkSum += numberDigit;
  }

  return checkSum % 10 == 0;
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

  if (!isValidCardNumberByLuhn(cardNumber)) {
    response.isValid = false;
    response.errors.push(
      'The card is not valid according to the Luhn algorithm',
    );
  }

  return response;
};
