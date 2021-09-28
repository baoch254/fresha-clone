import { HttpStatus } from '@nestjs/common';
import { AppException } from '../abstract';

export class EntityExistException extends AppException {
  constructor(msg: string, key: string) {
    super(HttpStatus.BAD_REQUEST, null, msg, `[${EntityExistException.name}] ${msg}`, key);
  }
}
