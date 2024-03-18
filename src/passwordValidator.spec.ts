import passwordValidator from './passwordValidator';

describe('Given a password validator controller', () => {
  it('Then it should be a function', () => {
    expect(typeof passwordValidator).toBe('function');
  });

  it('When the password is valid, then it should return true', () => {
    const validPassword = 'superContraseña12!';
    const expectedResponse = true;
    const expectedErrors = [];

    const response = passwordValidator(validPassword);

    expect(response.invalidPasswordErrors).toEqual(expectedErrors);
    expect(response.valid).toBe(expectedResponse);
  });

  it('When it receives a number, then it should throw', () => {
    const numericPassword = 1234 as unknown as string;
    const message = 'Password must be an string';

    expect(() => passwordValidator(numericPassword)).toThrow(message);
  });

  it('when the password is shorter than 8 characters, then it should return an error message', () => {
    const shortPassword = '1234';
    const errorMessage = 'Password must be at least 8 characters';

    const response = passwordValidator(shortPassword);

    expect(response.valid).toBe(false);
    expect(response.invalidPasswordErrors).toContain(errorMessage);
  });

  it('When the password does not contain at least 2 numbers, then it should return an error message', () => {
    const passwordWithoutTwoNumbers = 'superContraseña1';
    const errorMessage = 'Password must contain at least 2 numbers';

    const response = passwordValidator(passwordWithoutTwoNumbers);

    expect(response.valid).toBe(false);
    expect(response.invalidPasswordErrors).toContain(errorMessage);
  });

  it('when the password does not contain at least one capital letter, then it should return an error message', () => {
    const passwordWithoutCapitals = 'supercontraseña12';
    const errorMessage = 'Password must contain at least one capital letter';

    const response = passwordValidator(passwordWithoutCapitals);

    expect(response.valid).toBe(false);
    expect(response.invalidPasswordErrors).toContain(errorMessage);
  });

  it('When the password does not contain at least one special character, then it should return an error message', () => {
    const passwordWithoutSpecialCharacters = 'superContraseña12';
    const errorMessage = 'Password must contain at least one special character';

    const response = passwordValidator(passwordWithoutSpecialCharacters);

    expect(response.valid).toBe(false);
    expect(response.invalidPasswordErrors).toContain(errorMessage);
  });
});
