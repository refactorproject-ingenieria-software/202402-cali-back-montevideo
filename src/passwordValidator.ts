interface PasswordInParams {
  password: string;
}

const isPasswordString = (password: unknown): password is string => {
  return typeof password === 'string';
};

const hasPasswordValidLength = ({
  password,
}: PasswordInParams): string | void => {
  if (password.length < 8) {
    return 'Password must be at least 8 characters';
  }
};

const hasPasswordAtLeastTwoNumbers = ({
  password,
}: PasswordInParams): string | void => {
  const numbersInPassword: null | string[] = password.match(/\d/g);

  if (!numbersInPassword || numbersInPassword.length < 2) {
    return 'Password must contain at least 2 numbers';
  }
};

export const passwordValidator = (password: string) => {
  const errors = [];

  if (!isPasswordString(password)) {
    throw new Error('Password must be an string');
  }

  errors.push(hasPasswordValidLength({ password }));
  errors.push(hasPasswordAtLeastTwoNumbers({ password }));

  const invalidPasswordErrors = errors.filter((error) => !!error);

  return {
    valid: !invalidPasswordErrors.length,
    invalidPasswordErrors,
  };
};

export default passwordValidator;
