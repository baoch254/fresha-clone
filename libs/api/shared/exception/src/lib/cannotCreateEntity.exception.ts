import { DatabaseException } from './system';
import { HttpStatus } from '@nestjs/common';
import { AppException } from './abstract';

export class CannotCreateEntityException extends AppException {
  constructor(entity: string, err: DatabaseException) {
    super(
      HttpStatus.BAD_REQUEST,
      err,
      `Can not create ${entity.toLowerCase()}`,
      `[${err.root.name}] ${err.root.message}`,
      `ErrCannotCreate${entity}`
    );
  }
}
