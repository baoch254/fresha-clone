import { InjectMapper } from '@automapper/nestjs';
import { EntityNotFoundException } from '@fresha/api/shared/exception';
import { UserCreateDto, UserUpdateDto } from './dto';
import { User } from './entity';
import { UserStorage } from './user.storage';
import { Injectable } from '@nestjs/common';
import { EntityExistException } from '@fresha/api/shared/exception';
import { I8nKey, IPaging } from '@fresha/api/shared/common';
import { Mapper } from '@automapper/types';
import { UserModel } from '@fresha/shared/data-access/model';

@Injectable()
export class UserService {
  constructor(private userStorage: UserStorage, @InjectMapper() private mapper: Mapper) {}

  async findAll(paging: IPaging): Promise<[UserModel[], number]> {
    const { cursor, page, limit } = paging;
    // Paging
    const [userList, totalPage] = await this.userStorage.findAll(page, limit, cursor);

    return [this.mapper.mapArray(userList, UserModel, User), totalPage];
  }

  findOne(id: number): Promise<User> {
    return this.userStorage.findOne(id);
  }

  async createUser(user: UserCreateDto) {
    const existUsers = await this.userStorage.findByCondition({ email: user.email });

    if (existUsers?.length > 0) {
      throw new EntityExistException('Email is already exist', I8nKey.ErrEntityEmailExist);
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
