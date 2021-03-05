import { HttpRequest, HttpResponse } from '../protocols';

export class SignUpController {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.name)
      return {
        statusCode: 400,
        body: new Error('Missing param: name')
      };

    if (!httpRequest.body.email)
      return {
        statusCode: 400,
        body: new Error('Missing param: email')
      };

    return { body: {}, statusCode: 200 };
  }
}
