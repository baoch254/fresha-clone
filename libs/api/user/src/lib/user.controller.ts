import { getSuccessListResp, getSuccessResp, IPaging } from '@fresha/api/shared/common';
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
  Delete,
  Query,
  DefaultValuePipe
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
  async findMany(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('cursor') cursor: number
  ) {
    const paging = new IPaging(page, limit, cursor);
    const [data, total] = await this.userService.findAll(paging);

    return getSuccessListResp(data, total, paging);
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
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return getSuccessResp(await this.userService.findOne(id));
  }

  @Post()
  @ApiOperation({ summary: 'Create new user' })
  @ApiCreatedResponse({ description: 'The record has been successfully created.' })
  async createOne(@Body() user: UserCreateDto) {
    return getSuccessResp(await this.userService.createUser(user));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiOkResponse({ description: 'The record has been successfully updated.' })
  async updateOne(@Param('id', ParseIntPipe) id: number, @Body() user: UserUpdateDto) {
    return getSuccessResp(await this.userService.updateUser(id, user));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiOkResponse({ description: 'The record has been successfully deleted.' })
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    return getSuccessResp(await this.userService.deleteUser(id));
  }
}
