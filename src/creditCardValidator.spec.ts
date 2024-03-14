describe('Given a credit card validor', () => {
  describe('When the functions receives a non string input', () => {
    it('Then the function should raise an error', () => {
      expect(() => {}).toThrow('Parameters should be string');
    });
  });
});
