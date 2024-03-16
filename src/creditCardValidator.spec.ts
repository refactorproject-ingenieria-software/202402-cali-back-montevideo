import { creditCardValidator } from './creditCardValidator';

describe('Given a credit card validor', () => {
  describe('When the functions receives a non string input', () => {
    it('Then the function should raise an error', () => {
      expect(() =>
        creditCardValidator('string', 5 as unknown as string),
      ).toThrow('Parameters should be string');
    });
  });
});
