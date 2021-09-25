import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { AutoMap } from '@automapper/classes';

@Entity({ name: 'users' })
export class User {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column({ length: 500, unique: true })
  email: string;

  @AutoMap()
  @Column({ length: 500 })
  fullname: string;

  @AutoMap()
  @Column({ length: 50 })
  password: string;
}
