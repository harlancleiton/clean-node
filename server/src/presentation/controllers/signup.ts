import { InvalidParamException, MissingParamException } from '../exceptions';
import { badRequest, serverError } from '../helpers';
import {
  Controller,
  EmailValidator,
  HttpRequest,
  HttpResponse
} from '../protocols';

export class SignUpController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {}

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

      return { body: {}, statusCode: 200 };
    } catch (error) {
      return serverError();
    }
  }
}
