import { HttpException } from '@nestjs/common';

interface ErrorData {
  error_message: string;
  status: number;
}

export class CustomException extends HttpException {
  constructor({ error_message, status }: ErrorData) {
    super({ error_message }, status);
  }
}
