import { IsEmail, IsNotEmpty } from 'class-validator';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDto {
  @ApiProperty()
  @AutoMap()
  @IsEmail()
  email: string;

  @ApiProperty()
  @AutoMap()
  @IsNotEmpty()
  fullname: string;

  @ApiProperty()
  @AutoMap()
  @IsNotEmpty()
  password: string;
}
