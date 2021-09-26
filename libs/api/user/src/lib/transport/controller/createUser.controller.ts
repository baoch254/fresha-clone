import { HttpExceptionFilter } from '@fresha/api/shared/exception';
import { CreateUserService } from '../../service';
import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { MapPipe } from '@automapper/nestjs';
import { ApiOperation, ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { UserCreateDto } from '../../model/dto';

@ApiTags('Users')
@UseFilters(HttpExceptionFilter)
@Controller('users')
export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}

  @Post()
  @ApiOperation({ summary: 'Create new user' })
  @ApiCreatedResponse({ description: 'The record has been successfully created.' })
  createOne(@Body(MapPipe(UserCreateDto, UserCreateDto)) user: UserCreateDto) {
    return this.createUserService.createUser(user);
  }
}
