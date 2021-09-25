import { Injectable } from '@nestjs/common';
import { UserUpdateDto } from '../model/dto';
import { UpdateUserStorage } from '../storage/updateUser.storage';

@Injectable()
export class UpdateUserService {
  constructor(private updateUserStorage: UpdateUserStorage) {}

  updateUser(id: number, user: UserUpdateDto) {
    return this.updateUserStorage.update(id, user);
  }
}
