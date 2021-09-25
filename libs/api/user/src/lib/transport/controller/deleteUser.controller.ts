import { DeleteUserService } from '../../service';
import { Controller, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class DeleteUserController {
  constructor(private deleteUserService: DeleteUserService) {}

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiOkResponse({ description: 'The record has been successfully deleted.' })
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.deleteUserService.deleteUser(id);
  }
}
