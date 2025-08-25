import { Migration } from '@mikro-orm/migrations';

export class Migration20250825152016_AlterUserAddDocumentColumn extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "user" add column "document" varchar(255) not null;`,
    );
    this.addSql(`create index "user_document_index" on "user" ("document");`);
    this.addSql(
      `alter table "user" add constraint "user_document_unique" unique ("document");`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop index "user_document_index";`);
    this.addSql(`alter table "user" drop constraint "user_document_unique";`);
    this.addSql(`alter table "user" drop column "document";`);
  }
}
