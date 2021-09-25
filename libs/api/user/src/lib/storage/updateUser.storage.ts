import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../model/entity';
import { UserUpdateDto } from '../model/dto';

@Injectable()
export class UpdateUserStorage {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async update(id: number, user: UserUpdateDto) {
    await this.userRepository.update(id, user);
    return true;
  }
}
