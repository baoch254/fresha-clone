import { DatabaseException } from './system';
import { HttpStatus } from '@nestjs/common';
import { AppException } from './abstract';

export class CannotListEntityException extends AppException {
  constructor(entity: string, err: DatabaseException) {
    super(
      HttpStatus.BAD_REQUEST,
      err,
      `Can not list ${entity.toLowerCase()}`,
      `[${err.root.name}] ${err.root.message}`,
      `ErrCannotList${entity}`
    );
  }
}
