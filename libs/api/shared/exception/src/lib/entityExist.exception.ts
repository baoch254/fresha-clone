import { HttpStatus } from '@nestjs/common';
import { AppException } from './abstract';

export class EntityExistException extends AppException {
  constructor(msg: string, key: string) {
    const rootErr = new Error(msg);
    super(
      HttpStatus.BAD_REQUEST,
      rootErr,
      msg,
      `[${EntityExistException.name}] ${rootErr.message}`,
      key
    );
  }
}
