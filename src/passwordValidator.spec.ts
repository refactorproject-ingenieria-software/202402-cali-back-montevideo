import passwordValidator from './passwordValidator';

describe('Given a password validator controller', () => {
  it('Then it should be a function', () => {
    expect(typeof passwordValidator).toBe('function');
  });

  it('When it receives a number, then it should throw', () => {
    const numericPassword = 1234 as unknown as string;
    const message = 'Password must be an string';

    expect(() => passwordValidator(numericPassword)).toThrow(message);
  });

  it('when the password is shorter than 8 characters, it should return an error message', () => {
    const shortPassword = '1234';
    const errorMessage = 'Password must be at least 8 characters';

    const response = passwordValidator(shortPassword);

    expect(response.valid).toBe(false);
    expect(response.invalidPasswordErrors).toContain(errorMessage);
  });

  it('When the password does not contain at least 2 numbers, it should return an error message', () => {
    const passwordWithoutTwoNumbers = 'superContraseña1';
    const errorMessage = 'Password must contain at least 2 numbers';

    const response = passwordValidator(passwordWithoutTwoNumbers);

    expect(response.valid).toBe(false);
    expect(response.invalidPasswordErrors).toContain(errorMessage);
  });
});
