import { HttpStatus } from '@nestjs/common';
import { AppException } from './abstract';

export class EntityNotFoundException extends AppException {
  constructor(msg: string, key: string) {
    const rootErr = new Error(msg);
    super(
      HttpStatus.BAD_REQUEST,
      rootErr,
      msg,
      `[${EntityNotFoundException.name}] ${rootErr.message}`,
      key
    );
  }
}
