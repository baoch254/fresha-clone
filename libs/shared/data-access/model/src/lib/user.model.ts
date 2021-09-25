import { ApiResponseProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class UserModel {
  @AutoMap()
  @ApiResponseProperty()
  id: number;

  @AutoMap()
  @ApiResponseProperty()
  email: string;

  @AutoMap()
  @ApiResponseProperty()
  fullname: string;
}
