import { ServerError } from '../exceptions';
import { HttpResponse } from '../protocols';

export function badRequest(error: Error): HttpResponse<Error> {
  return { statusCode: 400, body: error };
}

export function serverError(): HttpResponse<ServerError> {
  return { statusCode: 500, body: new ServerError() };
}
