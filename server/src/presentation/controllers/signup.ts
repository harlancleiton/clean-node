import { MissingParamException } from '../exceptions';
import { badRequest } from '../helpers';
import { HttpRequest, HttpResponse } from '../protocols';

export class SignUpController {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.name)
      return badRequest(new MissingParamException('name'));

    if (!httpRequest.body.email)
      return badRequest(new MissingParamException('email'));

    return { body: {}, statusCode: 200 };
  }
}
