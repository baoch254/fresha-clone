import { Injectable } from '@nestjs/common';
import { CreateUserStorage } from '../storage';
import { UserCreateDto } from '../model/dto';

@Injectable()
export class CreateUserService {
  constructor(private createUserStorage: CreateUserStorage) {}

  async createUser(user: UserCreateDto) {
    await this.createUserStorage.create(user);
    return true;
  }
}
