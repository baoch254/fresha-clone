import { HttpStatus } from '@nestjs/common';
import { AppException } from './abstract';

export class InternalException extends AppException {
  constructor(err: Error) {
    super(
      HttpStatus.INTERNAL_SERVER_ERROR,
      err,
      'Something went wrong in the server',
      `[${err.name}] Something went wrong in the server`,
      'INTERNAL_ERROR'
    );
  }
}
