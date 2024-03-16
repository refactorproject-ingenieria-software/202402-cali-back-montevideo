const creditCardValidator = (cardNumber: string, expirationDate: string) => {
  if (typeof cardNumber !== 'string' || typeof expirationDate !== 'string') {
    throw 'Parameters should be string';
  }
};
describe('Given a credit card validor', () => {
  describe('When the functions receives a non string input', () => {
    it('Then the function should raise an error', () => {
      expect(() =>
        creditCardValidator('string', 5 as unknown as string),
      ).toThrow('Parameters should be string');
    });
  });
});
