import { Column, CreateDateColumn, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { AutoMap } from '@automapper/classes';

export class BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Index()
  @Column({ type: 'int', default: 1 })
  status: number;

  @AutoMap()
  @UpdateDateColumn()
  updatedAt: Date;

  @AutoMap()
  @CreateDateColumn()
  createdAt: Date;
}
