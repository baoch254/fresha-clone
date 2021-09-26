import { UserModel } from '@fresha/shared/data-access/model';
import { ListUserService } from '../../service';
import { Controller, Get, Param, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { MapInterceptor } from '@automapper/nestjs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../../model/entity';

@ApiTags('Users')
@Controller('users')
export class ListUserController {
  constructor(private listUserService: ListUserService) {}

  @Get()
  @ApiOperation({ summary: 'Get user list' })
  @ApiResponse({
    status: 200,
    description: 'Get user list successfully',
    type: UserModel,
    isArray: true
  })
  @UseInterceptors(MapInterceptor(UserModel, User, { isArray: true }))
  findMany() {
    return this.listUserService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one user by id' })
  @ApiResponse({
    status: 200,
    description: 'Get one user successfully',
    type: UserModel
  })
  @ApiResponse({
    status: 404,
    description: 'The record is not founded'
  })
  @UseInterceptors(MapInterceptor(UserModel, User))
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.listUserService.findOne(id);
  }
}
