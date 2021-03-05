export class SignUpController {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handle(httpRequest: any): Promise<any> {
    return {
      statusCode: 400,
      body: new Error('Missing param: name')
    };
  }
}
