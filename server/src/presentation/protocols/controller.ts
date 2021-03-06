import { HttpRequest, HttpResponse } from './http';

export interface Controller<TRequest = any, TResponse = any> {
  handle(htpRequest: HttpRequest<TRequest>): Promise<HttpResponse<TResponse>>;
}
