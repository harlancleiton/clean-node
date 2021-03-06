import { badRequest, created, serverError } from '~/presentation/helpers';

import { InvalidParamException, MissingParamException } from '../../exceptions';
import {
  AddAccount,
  Controller,
  EmailValidator,
  HttpRequest,
  HttpResponse
} from './signup-protocols';

export class SignUpController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = [
        'email',
        'name',
        'password',
        'passwordConfirmation'
      ];

      const { body } = httpRequest;

      for (const field of requiredFields) {
        if (!body[field]) return badRequest(new MissingParamException(field));
      }

      const { email, password, passwordConfirmation } = body;

      const emailIsValid = this.emailValidator.isValid(email);
      if (!emailIsValid) return badRequest(new InvalidParamException('email'));

      const passwordMatched = password === passwordConfirmation;
      if (!passwordMatched)
        return badRequest(new InvalidParamException('passwordConfirmation'));

      const { name } = body;
      const account = await this.addAccount.execute({ name, email, password });

      return created(account);
    } catch (error) {
      return serverError();
    }
  }
}
