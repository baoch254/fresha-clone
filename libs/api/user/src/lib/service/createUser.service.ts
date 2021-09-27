import { ListUserStorage } from './../storage/listUser.storage';
import { Injectable } from '@nestjs/common';
import { CreateUserStorage } from '../storage';
import { UserCreateDto } from '../model/dto';
import { EntityExistException } from '@fresha/api/shared/exception';

@Injectable()
export class CreateUserService {
  constructor(
    private createUserStorage: CreateUserStorage,
    private listUserStorage: ListUserStorage
  ) {}

  async createUser(user: UserCreateDto) {
    const existUser = await this.listUserStorage.findByCondition({ email: user.email });

    if (existUser?.length > 0) {
      throw new EntityExistException('Email is already exist', 'ErrEntityEmailExist');
    }

    await this.createUserStorage.create(user);
    return true;
  }
}
