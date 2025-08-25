import { TSMigrationGenerator } from '@mikro-orm/migrations';
import { EntityName, MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import mikroOrmConfig from 'mikro-orm.config';
import { DatabaseConfig } from 'src/config/database.config';

export const DatabaseEntities = (entities: EntityName<Partial<any>>[]) =>
  MikroOrmModule.forFeature(entities);

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      inject: [ConfigService],
      driver: PostgreSqlDriver,
      useFactory: async (configService: ConfigService) => {
        const config = configService.get<DatabaseConfig>('database');
        return {
          ...mikroOrmConfig,
          dbName: config.name,
          host: config.host,
          port: config.port,
          user: config.user,
          password: config.password,
          driver: PostgreSqlDriver,
          entities: ['dist/**/*.entity.js'],
          entitiesTs: ['src/**/*.entity.ts'],
          migrations: {
            tableName: 'migrations',
            path: 'dist/modules/database/migrations',
            pathTs: 'src/modules/database/migrations',
            transactional: true,
            emit: 'ts',
            generator: TSMigrationGenerator,
          },
        };
      },
    }),
  ],
})
export class DatabaseModule {}
