export type CreditCard = {
  cardNumber: string;
  expirationDate: string;
};
export type CreditCardField = keyof CreditCard;
export type CreditCardFieldType<Field extends CreditCardField> =
  CreditCard[Field];
export type CardValidatorResponse = {
  isValid: boolean;
  errors: string[];
};
