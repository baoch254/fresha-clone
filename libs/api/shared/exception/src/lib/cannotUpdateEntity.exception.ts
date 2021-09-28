import { DatabaseException } from './system';
import { HttpStatus } from '@nestjs/common';
import { AppException } from './abstract';

export class CannotUpdateEntityException extends AppException {
  constructor(entity: string, err: DatabaseException) {
    super(
      HttpStatus.BAD_REQUEST,
      err,
      `Can not update ${entity.toLowerCase()}`,
      `[${err.root.name}] ${err.root.message}`,
      `ErrCannotUpdate${entity}`
    );
  }
}
