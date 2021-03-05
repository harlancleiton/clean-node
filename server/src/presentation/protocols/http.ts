export interface HttpResponse<TBody = any> {
  statusCode: number;
  body: TBody;
}

export interface HttpRequest<TBody = any> {
  body?: TBody;
}
