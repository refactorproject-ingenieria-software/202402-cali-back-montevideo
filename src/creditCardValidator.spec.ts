import { creditCardValidator } from './creditCardValidator';

describe('Given a credit card validator', () => {
  describe('When the functions receives a non string input', () => {
    it('Then the function should return a non valid card object and the validation error', () => {
      const expectedCardResponse = {
        isValid: false,
        errors: ['expirationDate should be string'],
      };
      const cardNumber = '1234567812345678';
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
      const cardNumber = '01234567';
      const expirationDate = '10/24';

      const cardResponse = creditCardValidator({
        cardNumber,
        expirationDate,
      });

      expect(cardResponse).toEqual(expectedCardResponse);
    });
  });
});
