import validator from 'validator';

import { EmailValidatorAdapter } from './email-validator-adapter';

jest.mock('validator', () => ({ isEmail: jest.fn() }));

describe('EmailValidatorAdapter', () => {
  let sut: EmailValidatorAdapter;

  beforeEach(() => {
    sut = new EmailValidatorAdapter();
  });

  it('should return false if validator returns false', () => {
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);

    const isValid = sut.isValid('invalid@mail.com');

    expect(isValid).toBeFalsy();
  });

  it('should return true if validator returns true', () => {
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(true);

    const isValid = sut.isValid('invalid@mail.com');

    expect(isValid).toBeTruthy();
  });
});
