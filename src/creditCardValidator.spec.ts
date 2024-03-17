import { creditCardValidator } from './creditCardValidator';

describe('Given a credit card validator', () => {
  describe('When the functions receives a non string input', () => {
    it('Then the function should return a non valid card object and the validation error', () => {
      const expectedCardResponse = {
        isValid: false,
        errors: [
          'expirationDate should be string',
          'The card must have a valid expiration date',
        ],
      };
      const cardNumber = '4485275742308327';
      const wrongTypeexpirationDate = 5 as unknown as string;

      const cardResponse = creditCardValidator({
        cardNumber,
        expirationDate: wrongTypeexpirationDate,
      });

      expect(cardResponse).toEqual(expectedCardResponse);
    });
  });

  describe('When the card numbre has less than 16 digits', () => {
    it('Then the function should return a non valid card object and the digit length validation error', () => {
      const expectedCardResponse = {
        isValid: false,
        errors: ['The card must have at least 16 digits'],
      };
      const cardNumber = '3693482527';
      const expirationDate = '10/24';

      const cardResponse = creditCardValidator({
        cardNumber,
        expirationDate,
      });

      expect(cardResponse).toEqual(expectedCardResponse);
    });
  });

  describe('When the card numbre has 16 digits but it does not follow the Luhn algorithm', () => {
    it('Then the function should return a non valid card object and the Luhn algorithm validation error', () => {
      const expectedCardResponse = {
        isValid: false,
        errors: ['The card is not valid according to the Luhn algorithm'],
      };
      const cardNumber = '2214567812345678';
      const expirationDate = '10/24';

      const cardResponse = creditCardValidator({
        cardNumber,
        expirationDate,
      });

      expect(cardResponse).toEqual(expectedCardResponse);
    });
  });

  describe('When the card numbre is not in a valid network', () => {
    it('Then the function should return a non valid card object and the network error', () => {
      const expectedCardResponse = {
        isValid: false,
        errors: [
          'The card must be from one of the following networks: Visa, Mastercard, American Express or Diners Club',
        ],
      };
      const cardNumber = '7001111111111117';
      const expirationDate = '10/24';

      const cardResponse = creditCardValidator({
        cardNumber,
        expirationDate,
      });

      expect(cardResponse).toEqual(expectedCardResponse);
    });
  });

  describe('When the expiration date is not valid', () => {
    it('Then the function should return a non valid card object and the invalid expiration error', () => {
      const expectedCardResponse = {
        isValid: false,
        errors: ['The card must have a valid expiration date'],
      };
      const cardNumber = '4242424242424242';
      const expirationDate = '13/24';

      const cardResponse = creditCardValidator({
        cardNumber,
        expirationDate,
      });

      expect(cardResponse).toEqual(expectedCardResponse);
    });
  });
  describe('When it receives a card that does not fullfill any criteria', () => {
    it('Then the function should return a non valid card object and all the errors', () => {
      const expectedCardResponse = {
        isValid: false,
        errors: [
          'cardNumber should be string',
          'The card must have at least 16 digits',
          'The card is not valid according to the Luhn algorithm',
          'The card must be from one of the following networks: Visa, Mastercard, American Express or Diners Club',
          'The card must have a valid expiration date',
        ],
      };
      const cardNumber = 123 as unknown as string;
      const expirationDate = 'not-a-date';

      const cardResponse = creditCardValidator({
        cardNumber,
        expirationDate,
      });

      expect(cardResponse).toEqual(expectedCardResponse);
    });
  });
  describe('When it receives a card that fullfills all criteria', () => {
    it('Then the function should return a valid card object and no errors', () => {
      const expectedCardResponse = {
        isValid: true,
        errors: [],
      };
      const cardNumber = '4485275742308327';
      const expirationDate = '12/24';

      const cardResponse = creditCardValidator({
        cardNumber,
        expirationDate,
      });

      expect(cardResponse).toEqual(expectedCardResponse);
    });
  });
});
