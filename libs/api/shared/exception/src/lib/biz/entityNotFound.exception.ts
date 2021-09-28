import { HttpStatus } from '@nestjs/common';
import { AppException } from '../abstract';

export class EntityNotFoundException extends AppException {
  constructor(entity: string) {
    const msg = `${entity} not found`;

    super(
      HttpStatus.BAD_REQUEST,
      null,
      msg,
      `[${EntityNotFoundException.name}] ${msg}`,
      `Err${entity}NotFound`
    );
  }
}
