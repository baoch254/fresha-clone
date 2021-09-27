import { Entity, Column } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { BaseEntity } from '@fresha/api/shared/abstract';

@Entity({ name: 'users' })
export class User extends BaseEntity {
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
