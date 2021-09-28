import { DatabaseException } from './system';
import { HttpStatus } from '@nestjs/common';
import { AppException } from './abstract';

export class CannotDeleteEntityException extends AppException {
  constructor(entity: string, err: DatabaseException) {
    super(
      HttpStatus.BAD_REQUEST,
      err,
      `Can not delete ${entity.toLowerCase()}`,
      `[${err.root.name}] ${err.root.message}`,
      `ErrCannotDelete${entity}`
    );
  }
}
