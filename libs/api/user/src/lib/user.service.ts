import { EntityNotFoundException } from '@fresha/api/shared/exception';
import { UserCreateDto, UserUpdateDto } from './dto';
import { User } from './entity';
import { UserStorage } from './user.storage';
import { Injectable } from '@nestjs/common';
import { EntityExistException } from '@fresha/api/shared/exception';

@Injectable()
export class UserService {
  constructor(private userStorage: UserStorage) {}

  findAll(): Promise<User[]> {
    return this.userStorage.findAll();
  }

  findOne(id: number): Promise<User> {
    return this.userStorage.findOne(id);
  }

  async createUser(user: UserCreateDto) {
    const existUsers = await this.userStorage.findByCondition({ email: user.email });

    if (existUsers?.length > 0) {
      throw new EntityExistException('Email is already exist', 'ErrEntityEmailExist');
    }

    await this.userStorage.createOne(user);
    return true;
  }

  async updateUser(id: number, user: UserUpdateDto) {
    const isExist = await this.userStorage.findOne(id);

    if (isExist == null) {
      throw new EntityNotFoundException('Entity is not found', 'ErrEntityNotFound');
    }

    await this.userStorage.updateOne(id, user);
    return true;
  }

  async deleteUser(id: number) {
    const isExist = await this.userStorage.findOne(id);

    if (isExist == null) {
      throw new EntityNotFoundException('Entity is not found', 'ErrEntityNotFound');
    }

    await this.userStorage.deleteOne(id);
    return true;
  }
}
