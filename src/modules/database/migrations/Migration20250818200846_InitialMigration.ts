import { Migration } from '@mikro-orm/migrations';

export class Migration20250818200846_InitialMigration extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "user" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz not null, "updated_at" timestamptz not null, "email" varchar(255) not null, "nickname" varchar(255) not null, "birthdate" timestamptz not null, "name" varchar(255) not null, "phone" varchar(255) not null, "role" text check ("role" in ('USER', 'ADMIN')) not null default 'USER', constraint "user_pkey" primary key ("id"));`,
    );
    this.addSql(
      `alter table "user" add constraint "user_email_unique" unique ("email");`,
    );
    this.addSql(`create index "user_nickname_index" on "user" ("nickname");`);
    this.addSql(
      `alter table "user" add constraint "user_nickname_unique" unique ("nickname");`,
    );
  }
}
