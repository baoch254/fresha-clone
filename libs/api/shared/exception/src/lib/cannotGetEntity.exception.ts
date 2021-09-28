import { DatabaseException } from './system';
import { HttpStatus } from '@nestjs/common';
import { AppException } from './abstract';

export class CannotGetEntityException extends AppException {
  constructor(entity: string, err: DatabaseException) {
    super(
      HttpStatus.BAD_REQUEST,
      err,
      `Can not get ${entity.toLowerCase()}`,
      `[${err.root.name}] ${err.root.message}`,
      `ErrCannotGet${entity}`
    );
  }
}
