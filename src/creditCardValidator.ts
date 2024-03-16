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

const sumLuhnNumbers = (i: number, cardNumber: string, checkSum: number) => {
  const isEven = i % 2 === 0;
  const currentDigit = cardNumber.charAt(i);
  let numberDigit = parseInt(currentDigit, 10);
  if (isEven && (numberDigit *= 2) > 9) numberDigit -= 9;
  checkSum += numberDigit;
  return checkSum;
};

const isValidCardNumberByLuhn = (cardNumber): boolean => {
  let checkSum = 0;
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    checkSum = sumLuhnNumbers(i, cardNumber, checkSum);
  }
  return checkSum % 10 == 0;
};

const creditCardTypeGuards = (
  response: CardValidatorResponse,
  cardNumber: string,
  expirationDate: string,
): void => {
  if (typeof cardNumber !== 'string') {
    response.isValid = false;
    response.errors.push(errorGenerator('cardNumber', 'string'));
  }

  if (typeof expirationDate !== 'string') {
    response.isValid = false;
    response.errors.push(errorGenerator('expirationDate', 'string'));
  }
};

const creditCardCardNumberGuards = (
  response: CardValidatorResponse,
  cardNumber: string,
): void => {
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
};

const creditCardNetworkGuards = (
  response: CardValidatorResponse,
  cardNumber: string,
) => {
  const validNetworks = {
    2: 'Mastercard',
    3: 'American Express',
    4: 'Visa',
    5: 'Mastercard',
    6: 'Discover',
  };

  if (!Object.keys(validNetworks).includes(`${cardNumber[0]}`)) {
    (response.isValid = false),
      response.errors.push(
        'The card must be from one of the following networks: Visa, Mastercard, American Express or Diners Club',
      );
  }
  return response;
};

export const creditCardValidator = ({
  cardNumber,
  expirationDate,
}: CreditCard): CardValidatorResponse => {
  const response: CardValidatorResponse = {
    isValid: true,
    errors: [],
  };

  creditCardTypeGuards(response, cardNumber, expirationDate);
  creditCardCardNumberGuards(response, cardNumber);
  creditCardNetworkGuards(response, cardNumber);

  return response;
};
