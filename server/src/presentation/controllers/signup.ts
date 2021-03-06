import { MissingParamException } from '../exceptions';
import { badRequest } from '../helpers';
import { HttpRequest, HttpResponse } from '../protocols';

export class SignUpController {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    return { body: {}, statusCode: 200 };
  }
}
