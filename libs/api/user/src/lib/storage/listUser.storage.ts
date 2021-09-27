import { User } from '../model/entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseException } from '@fresha/api/shared/exception';

@Injectable()
export class ListUserStorage {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  findAll(): Promise<User[]> {
    try {
      return this.userRepository.find();
    } catch (err) {
      throw new DatabaseException(err, err.message);
    }
  }

  findOne(id: number): Promise<User> {
    try {
      return this.userRepository.findOne(id);
    } catch (err) {
      throw new DatabaseException(err, err.message);
    }
  }

  findByCondition(condition: any): Promise<User[]> {
    try {
      return this.userRepository.find({
        ...condition
      });
    } catch (err) {
      throw new DatabaseException(err, err.message);
    }
  }
}
