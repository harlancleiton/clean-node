import { InvalidParamException, MissingParamException } from '../exceptions';
import { badRequest } from '../helpers';
import {
  Controller,
  EmailValidator,
  HttpRequest,
  HttpResponse
} from '../protocols';

export class SignUpController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = [
      'email',
      'name',
      'password',
      'passwordConfirmation'
    ];

    for (const field of requiredFields) {
      if (!httpRequest.body[field])
        return badRequest(new MissingParamException(field));
    }

    const emailIsValid = this.emailValidator.isValid(httpRequest.body.email);
    if (!emailIsValid) return badRequest(new InvalidParamException('email'));

    return { body: {}, statusCode: 200 };
  }
}
