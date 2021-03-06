import { EmailValidatorAdapter } from './email-validator-adapter';

describe('EmailValidatorAdapter', () => {
  let sut: EmailValidatorAdapter;

  beforeEach(() => {
    sut = new EmailValidatorAdapter();
  });

  it('should return false if validator returns false', () => {
    const isValid = sut.isValid('invalid@mail.com');

    expect(isValid).toBeFalsy();
  });
});
