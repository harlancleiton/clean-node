import {
  InvalidParamException,
  MissingParamException,
  ServerError
} from '../exceptions';
import { EmailValidator } from '../protocols';
import { SignUpController } from './signup';

describe('SignUpController', () => {
  let sut: SignUpController;
  let emailValidatorStub: EmailValidator;

  beforeEach(() => {
    class EmailValidatorStub implements EmailValidator {
      isValid(email: string): boolean {
        return !!email;
      }
    }

    emailValidatorStub = new EmailValidatorStub();
    sut = new SignUpController(emailValidatorStub);
  });

  it('should return 400 if no name is provided', async () => {
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamException('name'));
  });

  it('should return 400 if no email is provided', async () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamException('email'));
  });

  it('should return 400 if no password is provided', async () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        passwordConfirmation: 'any_password'
      }
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamException('password'));
  });

  it('should return 400 if no password confirmation is provided', async () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamException('passwordConfirmation')
    );
  });

  it('should return 400 if no password confirmation fails', async () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'invalid_password'
      }
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new InvalidParamException('passwordConfirmation')
    );
  });

  it('should return 400 if an invalid email is provided', async () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };

    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamException('email'));
  });

  it('should call EmailValidator with correct email', async () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };

    jest.spyOn(emailValidatorStub, 'isValid');

    await sut.handle(httpRequest);

    expect(emailValidatorStub.isValid).toBeCalledWith(httpRequest.body.email);
  });

  it('should return 500 if EmailValidator throws', async () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };

    jest.spyOn(emailValidatorStub, 'isValid').mockImplementation(() => {
      throw new ServerError();
    });

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });
});
