import { EntityStatus } from '@fresha/api/shared/common';
import { Injectable } from '@nestjs/common';
import { FindConditions, Repository } from 'typeorm';
import { DatabaseException } from '@fresha/api/shared/exception';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class BaseStorage<T> {
  constructor(private repository: Repository<T>) {}

  findAll(): Promise<T[]> {
    try {
      return this.repository.find();
    } catch (err) {
      throw new DatabaseException(err, err.message);
    }
  }

  findOne(id: number): Promise<T> {
    try {
      return this.repository.findOne(id, {
        where: {
          status: EntityStatus.ACTIVE
        }
      });
    } catch (err) {
      throw new DatabaseException(err, err.message);
    }
  }

  findByCondition(condition: FindConditions<T>): Promise<T[]> {
    try {
      return this.repository.find({
        ...condition,
        status: EntityStatus.ACTIVE
      });
    } catch (err) {
      throw new DatabaseException(err, err.message);
    }
  }

  async createOne(data: any) {
    try {
      await this.repository.save(data);
      return true;
    } catch (err) {
      throw new DatabaseException(err, err.message);
    }
  }

  async updateOne(id: number, data: QueryDeepPartialEntity<T>) {
    try {
      await this.repository.update(id, data);
      return true;
    } catch (err) {
      throw new DatabaseException(err, err.message);
    }
  }

  async deleteOne(id: number, data: any = { status: EntityStatus.INACTIVE }) {
    try {
      await this.repository.update(id, data);
      return true;
    } catch (err) {
      throw new DatabaseException(err, err.message);
    }
  }

  async deleteOneHardly(id: number) {
    try {
      await this.repository.delete(id);
      return true;
    } catch (err) {
      throw new DatabaseException(err, err.message);
    }
  }
}
