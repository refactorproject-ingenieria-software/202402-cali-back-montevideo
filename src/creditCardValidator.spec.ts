import { creditCardValidator } from './creditCardValidator';

describe('Given a credit card validor', () => {
  describe('When the functions receives a non string input', () => {
    it('Then the function should return a non valid card object and the validation error', () => {
      const expectedCardResponse = {
        valid: false,
        errors: [
          'cardNumber should be string',
          'expirationDate should be string',
        ],
      };
      const cardNumber = 'string';
      const wrongTypeexpirationDate = 5;

      const cardResponse = creditCardValidator({
        cardNumber,
        expirationDate: wrongTypeexpirationDate,
      });

      expect(cardResponse).toEqual(expectedCardResponse);
    });
  });
});
