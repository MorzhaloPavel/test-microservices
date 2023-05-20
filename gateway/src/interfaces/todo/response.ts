export interface ITodoIdResponse {
  id: string;
}

export interface ITodoGetResponse extends ITodoIdResponse {
  title: string;
  description: string;
}
