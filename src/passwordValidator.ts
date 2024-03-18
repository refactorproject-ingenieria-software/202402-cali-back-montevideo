interface PasswordInParams {
  password: string;
}

type MaybeString = string | void;

const isPasswordString = ({ password }: PasswordInParams): never | void => {
  if (typeof password !== 'string') {
    throw new Error('Password must be an string');
  }
};

const hasPasswordValidLength = ({
  password,
}: PasswordInParams): MaybeString => {
  if (password.length < 8) {
    return 'Password must be at least 8 characters';
  }
};

const hasPasswordAtLeastTwoNumbers = ({
  password,
}: PasswordInParams): MaybeString => {
  const numbersInPassword: string[] = password.match(/\d/g) ?? [];

  if (!numbersInPassword || numbersInPassword.length < 2) {
    return 'Password must contain at least 2 numbers';
  }
};

const hasPasswordCapitalLetter = ({
  password,
}: PasswordInParams): MaybeString => {
  const capitalInPassword = /[A-Z]/.test(password);

  if (!capitalInPassword) {
    return 'Password must contain at least one capital letter';
  }
};

const hasPasswordSpecialCharacter = ({
  password,
}: PasswordInParams): MaybeString => {
  const specialCharacters = /[!@#$%^ &*(),.?":{}|<>]/;
  const specialCharacterInPassword = specialCharacters.test(password);

  if (!specialCharacterInPassword) {
    return 'Password must contain at least one special character';
  }
};

export const passwordValidator = (password: string) => {
  const errors = [];

  isPasswordString({ password });

  errors.push(hasPasswordValidLength({ password }));
  errors.push(hasPasswordAtLeastTwoNumbers({ password }));
  errors.push(hasPasswordCapitalLetter({ password }));
  errors.push(hasPasswordSpecialCharacter({ password }));

  const invalidPasswordErrors = errors.filter((error) => error);

  return {
    valid: !invalidPasswordErrors.length,
    invalidPasswordErrors,
  };
};

export default passwordValidator;
