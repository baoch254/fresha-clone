import { DatabaseException } from '@fresha/api/shared/exception';
import { User } from '../model/entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateDto } from '../model/dto';

@Injectable()
export class CreateUserStorage {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(user: UserCreateDto) {
    try {
      await this.userRepository.save(user);
      return true;
    } catch (err) {
      throw new DatabaseException(err, err.message);
    }
  }
}
