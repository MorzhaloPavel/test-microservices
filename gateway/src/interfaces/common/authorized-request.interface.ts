export interface IAuthorizedRequest extends Request {
  user?: { userId: string };
}
