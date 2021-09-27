import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { AutoMap } from '@automapper/classes';

export class BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column({ type: 'int', default: 1 })
  status: number;

  @AutoMap()
  @UpdateDateColumn()
  updatedAt: Date;

  @AutoMap()
  @CreateDateColumn()
  createdAt: Date;
}
