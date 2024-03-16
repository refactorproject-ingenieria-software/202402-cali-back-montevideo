import { creditCardValidator } from './creditCardValidator';

describe('Given a credit card validator', () => {
  describe('When the functions receives a non string input', () => {
    it('Then the function should return a non valid card object and the validation error', () => {
      const expectedCardResponse = {
        isValid: false,
        errors: ['expirationDate should be string'],
      };
      const cardNumber = 'string';
      const wrongTypeexpirationDate = 5 as unknown as string;

      const cardResponse = creditCardValidator({
        cardNumber,
        expirationDate: wrongTypeexpirationDate,
      });

      expect(cardResponse).toEqual(expectedCardResponse);
    });
  });
});
