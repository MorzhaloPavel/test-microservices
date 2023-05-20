import { Types } from 'mongoose';

export interface IAuthSigninResponse {
  token: string;
}

export interface IAuthSignupResponse extends IAuthSigninResponse {
  id: Types.ObjectId;
}
