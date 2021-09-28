import { User } from './entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseStorage } from '@fresha/api/shared/abstract';

@Injectable()
export class UserStorage extends BaseStorage<User> {
  public entityName = User.name;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
    super(userRepository);
  }
}
