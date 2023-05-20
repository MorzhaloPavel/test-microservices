export class SignupDto {
  password: string;
}

export class SigninDto extends SignupDto {
  id: string;
}
