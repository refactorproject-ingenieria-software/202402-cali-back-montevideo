export const creditCardValidator = (
  cardNumber: string,
  expirationDate: string,
) => {
  if (typeof cardNumber !== 'string' || typeof expirationDate !== 'string') {
    throw 'Parameters should be string';
  }
};
