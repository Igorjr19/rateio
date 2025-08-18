import { TSMigrationGenerator } from '@mikro-orm/migrations';
import type { MikroORMOptions } from '@mikro-orm/postgresql';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { config } from 'dotenv';

config();

const mikroOrmConfig: Partial<MikroORMOptions> = {
  dbName: process.env.POSTGRES_NAME || 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || '',
  driver: PostgreSqlDriver,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  migrations: {
    tableName: 'migrations',
    path: 'dist/modules/database/migrations',
    pathTs: 'src/modules/database/migrations',
    transactional: true,
    snapshot: false,
    emit: 'ts',
    generator: TSMigrationGenerator,
  },
};

export default mikroOrmConfig;
