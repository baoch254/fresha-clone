import { UpdateUserService } from '../../service';
import { Body, Controller, Put, Param, ParseIntPipe } from '@nestjs/common';
import { MapPipe } from '@automapper/nestjs';
import { ApiOperation, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { UserUpdateDto } from '../../model/dto';

@ApiTags('Users')
@Controller('users')
export class UpdateUserController {
  constructor(private updateUserService: UpdateUserService) {}

  @Put(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiOkResponse({ description: 'The record has been successfully updated.' })
  updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body(MapPipe(UserUpdateDto, UserUpdateDto)) user: UserUpdateDto
  ) {
    return this.updateUserService.updateUser(id, user);
  }
}
