import { MissingParamException } from '../exceptions';
import { HttpRequest, HttpResponse } from '../protocols';

export class SignUpController {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.name)
      return {
        statusCode: 400,
        body: new MissingParamException('name')
      };

    if (!httpRequest.body.email)
      return {
        statusCode: 400,
        body: new MissingParamException('email')
      };

    return { body: {}, statusCode: 200 };
  }
}
