import {
  CannotGetEntityException,
  CannotListEntityException,
  EntityNotFoundException,
  CannotCreateEntityException,
  CannotUpdateEntityException,
  CannotDeleteEntityException,
  DatabaseException
} from '@fresha/api/shared/exception';
import { UserCreateDto, UserUpdateDto } from './dto';
import { User } from './entity';
import { UserStorage } from './user.storage';
import { Injectable } from '@nestjs/common';
import { EntityExistException } from '@fresha/api/shared/exception';
import { I8nKey, IPaging } from '@fresha/api/shared/common';

@Injectable()
export class UserService {
  constructor(private userStorage: UserStorage) {}

  async findAll(paging: IPaging): Promise<[User[], number]> {
    try {
      return await this.userStorage.findAll(paging);
    } catch (ex) {
      if (ex instanceof DatabaseException) {
        throw new CannotListEntityException(this.userStorage.entityName, ex);
      }

      throw ex;
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userStorage.findOne(id);
      if (user == null) {
        throw new EntityNotFoundException(this.userStorage.entityName);
      }

      return user;
    } catch (ex) {
      if (ex instanceof DatabaseException) {
        throw new CannotGetEntityException(this.userStorage.entityName, ex);
      }

      throw ex;
    }
  }

  async createUser(user: UserCreateDto) {
    try {
      const existUser = await this.userStorage.findOneByCondition({ email: user.email });

      if (existUser != null) {
        throw new EntityExistException('Email is already exist', I8nKey.ErrEntityEmailExist);
      }

      await this.userStorage.createOne(user);
      return true;
    } catch (ex) {
      if (ex instanceof DatabaseException) {
        throw new CannotCreateEntityException(this.userStorage.entityName, ex);
      }

      throw ex;
    }
  }

  async updateUser(id: number, user: UserUpdateDto) {
    try {
      const isExist = await this.userStorage.findOne(id);

      if (isExist == null) {
        throw new EntityNotFoundException(this.userStorage.entityName);
      }

      const existUser = await this.userStorage.findOneByCondition({ email: user.email });

      if (existUser?.id !== id) {
        throw new EntityExistException('Email is already exist', I8nKey.ErrEntityEmailExist);
      }

      await this.userStorage.updateOne(id, user);
      return true;
    } catch (ex) {
      if (ex instanceof DatabaseException) {
        throw new CannotUpdateEntityException(this.userStorage.entityName, ex);
      }

      throw ex;
    }
  }

  async deleteUser(id: number) {
    try {
      const isExist = await this.userStorage.findOne(id);

      if (isExist == null) {
        throw new EntityNotFoundException(this.userStorage.entityName);
      }

      await this.userStorage.deleteOne(id);
      return true;
    } catch (ex) {
      if (ex instanceof DatabaseException) {
        throw new CannotDeleteEntityException(this.userStorage.entityName, ex);
      }

      throw ex;
    }
  }
}
