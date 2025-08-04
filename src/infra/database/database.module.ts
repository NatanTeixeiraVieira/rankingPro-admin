import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  connectionSource,
  dataSourceOptions,
  setupDatabase,
} from './typeorm/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => dataSourceOptions,

      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        await setupDatabase(options as PostgresConnectionOptions);

        return connectionSource;
      },
    }),
  ],
})
export class DatabaseModule {}
