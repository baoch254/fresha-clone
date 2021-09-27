import { BaseEntity } from '../entity';
import { EntityStatus } from '@fresha/api/shared/common';
import { Injectable } from '@nestjs/common';
import { FindConditions, Repository } from 'typeorm';
import { DatabaseException } from '@fresha/api/shared/exception';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class BaseStorage<T extends BaseEntity> {
  constructor(private repository: Repository<T>) {}

  findAll(
    page: number,
    limit: number,
    cursor: number | string | null,
    conditions?: string[]
  ): Promise<[T[], number]> {
    try {
      let builder = this.repository.createQueryBuilder();

      // list data with cursor
      if (cursor != null) {
        builder = builder.where('id < :cursor', { cursor }).andWhere('status = 1');
      } else {
        builder = builder.skip((page - 1) * limit).where('status = 1');
      }

      // add conditions
      if (conditions) {
        for (const cond of conditions) {
          builder = builder.andWhere(cond);
        }
      }

      // default sorted
      builder = builder.orderBy('id', 'DESC').take(limit);

      return builder.getManyAndCount();
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
