import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../model/entity';

@Injectable()
export class DeleteUserStorage {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async delete(id: number) {
    await this.userRepository.delete(id);
    return true;
  }
}
