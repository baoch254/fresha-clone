import { HttpStatus } from '@nestjs/common';
import { AppException } from './abstract';

export class DatabaseException extends AppException {
  constructor(err: Error, log: string) {
    super(HttpStatus.BAD_REQUEST, err, 'Something went wrong with DB', log, 'DB_ERROR');
  }
}
