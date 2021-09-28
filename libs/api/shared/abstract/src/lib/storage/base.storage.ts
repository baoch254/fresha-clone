import { BaseEntity } from '../entity';
import { EntityStatus, IPaging } from '@fresha/api/shared/common';
import { Injectable } from '@nestjs/common';
import { FindConditions, Repository } from 'typeorm';
import { DatabaseException } from '@fresha/api/shared/exception';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class BaseStorage<T extends BaseEntity> {
  constructor(private repository: Repository<T>) {}

  async findAll(paging: IPaging, conditions?: string[]): Promise<[T[], number]> {
    try {
      const { cursor, page, limit } = paging;
      let builder = this.repository.createQueryBuilder().where('status = 1');

      // Add conditions
      if (conditions) {
        for (const cond of conditions) {
          builder = builder.andWhere(cond);
        }
      }

      const total = await builder.getCount();

      // list data with cursor
      if (cursor != null) {
        builder = builder.andWhere('id < :cursor', { cursor });
      } else {
        builder = builder.skip((page - 1) * limit);
      }

      // default sorted
      builder = builder.orderBy('id', 'DESC').take(limit);

      return [await builder.getMany(), total];
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

  findOneByCondition(condition: FindConditions<T>): Promise<T> {
    try {
      return this.repository.findOne({
        where: {
          ...condition,
          status: EntityStatus.ACTIVE
        }
      });
    } catch (err) {
      throw new DatabaseException(err, err.message);
    }
  }

  findManyByCondition(condition: FindConditions<T>): Promise<T[]> {
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
