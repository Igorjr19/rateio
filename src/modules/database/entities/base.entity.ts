import {
  BaseEntity as MikroOrmBaseEntity,
  Entity,
  Property,
} from '@mikro-orm/core';

@Entity({ abstract: true })
export abstract class BaseEntity extends MikroOrmBaseEntity {
  @Property({ onCreate: () => new Date() })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
