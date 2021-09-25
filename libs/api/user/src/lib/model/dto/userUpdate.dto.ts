import { IsEmail, IsNotEmpty } from 'class-validator';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateDto {
  @ApiProperty()
  @AutoMap()
  @IsEmail()
  email: string;

  @ApiProperty()
  @AutoMap()
  @IsNotEmpty()
  fullname: string;
}
