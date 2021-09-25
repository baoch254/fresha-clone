import { Injectable } from '@nestjs/common';
import { ListUserStorage } from '../storage';
import { UserModel } from '@fresha/shared/data-access/model';
import { User } from '../model/entity';

@Injectable()
export class ListUserService {
  constructor(private listUserStorage: ListUserStorage) {}

  findAll(): Promise<User[]> {
    return this.listUserStorage.findAll();
  }

  findOne(id: number): Promise<UserModel> {
    return this.listUserStorage.findOne(id);
  }
}
