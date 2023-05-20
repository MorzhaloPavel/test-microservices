export interface IAuthSigninResponse {
  token: string;
}

export interface IAuthSignupResponse extends IAuthSigninResponse {
  id: string;
}

export interface IAuthUserResponse {
  id: string;
}
