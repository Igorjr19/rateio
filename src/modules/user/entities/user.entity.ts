import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core';

import { BaseEntity } from '../../database/entities/base.entity';
import { Role } from '../enum/role.enum';
import { UserRepository } from '../user.repository';

@Entity({ repository: () => UserRepository })
export class User extends BaseEntity {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  @Property({ type: 'uuid' })
  id: string;

  @Property({ nullable: false, unique: true })
  email: string;

  @Property({ nullable: false, unique: true, index: true })
  nickname: string;

  @Property()
  birthdate: Date;

  @Property()
  name: string;

  @Property()
  phone: string;

  @Enum({ items: () => Role, default: Role.USER, nullable: false })
  role: Role;
}
