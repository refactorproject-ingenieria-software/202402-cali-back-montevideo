type CreditCard = {
  cardNumber: string;
  expirationDate: string;
};
type CardValidatorResponse = {
  isValid: boolean;
  errors: string[];
};

// Generates error messages for invalid fields type
const fieldTypeErrorMessageGenerator = (
  field: string,
  type: string,
): string => {
  return `${field} should be ${type}`;
};

const currentDigitValueByLuhn = (currentDigit, isEven) => {
  let numberDigit = parseInt(currentDigit, 10);
  if (isEven && (numberDigit *= 2) > 9) numberDigit -= 9;
  return numberDigit;
};

/**
 * Sums digits according to the Luhn algorithm
 *
 * @param {number} i - Current index in the card number
 * @param {string} cardNumber - The card number being validated
 * @param {number} cardNumberSum - The accumulated sum value until last index
 * @return {number} The accumulated sum value for current index
 */
const sumCardNumberByLuhn = (
  i: number,
  cardNumber: string,
  cardNumberSum: number,
) => {
  const isEven = i % 2 === 0;
  const currentDigit = cardNumber.charAt(i);
  const currentDigitLuhnValue = currentDigitValueByLuhn(currentDigit, isEven);
  cardNumberSum += currentDigitLuhnValue;
  return cardNumberSum;
};

const checkSumLuhnConditions = (sumAmount) => {
  const isMorenThanZero = sumAmount > 0;
  const isTeenFactor = sumAmount % 10 === 0;
  return isMorenThanZero && isTeenFactor;
};

const isValidCardNumberByLuhn = (cardNumber: string): boolean => {
  let cardNumberSum = 0;
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    cardNumberSum = sumCardNumberByLuhn(i, cardNumber, cardNumberSum);
  }
  return checkSumLuhnConditions(cardNumberSum);
};

const validateCreditCardFieldsType = (
  response: CardValidatorResponse,
  cardNumber: string,
  expirationDate: string,
): void => {
  if (typeof cardNumber !== 'string') {
    response.isValid = false;
    response.errors.push(
      fieldTypeErrorMessageGenerator('cardNumber', 'string'),
    );
  }

  if (typeof expirationDate !== 'string') {
    response.isValid = false;
    response.errors.push(
      fieldTypeErrorMessageGenerator('expirationDate', 'string'),
    );
  }
};

const validateCreditCardCardNumber = (
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

const validateCreditCardNetwork = (
  response: CardValidatorResponse,
  cardNumber: string,
): void => {
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
};

const isValidExpirationDateFormat = (expirationDate: string): boolean => {
  const regex = /^(0[1-9]|1[0-2])\/([2-9][0-9])$/;
  return regex.test(expirationDate);
};

const validateCreditCardExpirationDate = (
  response: CardValidatorResponse,
  expirationDate: string,
): void => {
  if (!isValidExpirationDateFormat(expirationDate)) {
    (response.isValid = false),
      response.errors.push('The card must have a valid expiration date');
  }
};

export const creditCardValidator = ({
  cardNumber,
  expirationDate,
}: CreditCard): CardValidatorResponse => {
  const response: CardValidatorResponse = {
    isValid: true,
    errors: [],
  };

  validateCreditCardFieldsType(response, cardNumber, expirationDate);
  validateCreditCardCardNumber(response, cardNumber);
  validateCreditCardNetwork(response, cardNumber);
  validateCreditCardExpirationDate(response, expirationDate);

  return response;
};
