import { ServerError } from '../exceptions';
import { HttpResponse } from '../protocols';

export function badRequest(error: Error): HttpResponse<Error> {
  return { statusCode: 400, body: error };
}

export function created<TBody = any>(data: TBody): HttpResponse<TBody> {
  return { statusCode: 201, body: data };
}

export function ok<TBody = any>(data: TBody): HttpResponse<TBody> {
  return { statusCode: 200, body: data };
}

export function serverError(): HttpResponse<ServerError> {
  return { statusCode: 500, body: new ServerError() };
}
