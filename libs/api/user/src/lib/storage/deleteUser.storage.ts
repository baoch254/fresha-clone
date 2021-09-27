import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../model/entity';
import { DatabaseException } from '@fresha/api/shared/exception';

@Injectable()
export class DeleteUserStorage {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async delete(id: number) {
    try {
      await this.userRepository.delete(id);
      return true;
    } catch (err) {
      throw new DatabaseException(err, err.message);
    }
  }
}
