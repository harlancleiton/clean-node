export class MissingParamException extends Error {
  constructor(paramName: string) {
    super(`Missing param: ${paramName}`);
    this.name = 'MissingParamException';
  }
}
