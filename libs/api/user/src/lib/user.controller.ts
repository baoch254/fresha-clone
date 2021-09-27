import { UserUpdateDto } from './dto';
import { User } from './entity';
import { MapInterceptor } from '@automapper/nestjs';
import { UserModel } from '@fresha/shared/data-access/model';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  Get,
  ParseIntPipe,
  Param,
  Put,
  Delete
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiCreatedResponse,
  ApiResponse,
  ApiOkResponse
} from '@nestjs/swagger';
import { UserCreateDto } from './dto';
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

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
    return this.userService.findAll();
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
    return this.userService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new user' })
  @ApiCreatedResponse({ description: 'The record has been successfully created.' })
  createOne(@Body() user: UserCreateDto) {
    return this.userService.createUser(user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiOkResponse({ description: 'The record has been successfully updated.' })
  updateOne(@Param('id', ParseIntPipe) id: number, @Body() user: UserUpdateDto) {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiOkResponse({ description: 'The record has been successfully deleted.' })
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
