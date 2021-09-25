import { Injectable } from '@nestjs/common';
import { DeleteUserStorage } from '../storage';

@Injectable()
export class DeleteUserService {
  constructor(private deleteUserStorage: DeleteUserStorage) {}

  deleteUser(id: number) {
    return this.deleteUserStorage.delete(id);
  }
}
