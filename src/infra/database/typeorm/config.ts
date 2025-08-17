import { EnvConfigService } from '@/application/env-config-service/env-config.service';
import { NestjsEnvConfigService } from '@/infra/env-config-service/nestjs/nestjs-env-config.service';
import { ConfigService, registerAs } from '@nestjs/config';
import path from 'node:path';
import { Client } from 'pg';
import 'tsconfig-paths/register';
import { DataSource, DataSourceOptions } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const envConfigService: EnvConfigService = new NestjsEnvConfigService(
  new ConfigService(),
);

export async function setupDatabase(options: PostgresConnectionOptions) {
  const client = new Client({
    host: options.host,
    port: options.port,
    user: options.username,
    password: options.password,
    database: 'postgres',
  });

  try {
    await client.connect();

    const dbResult = await client.query(
      'SELECT 1 FROM pg_database WHERE datname = $1',
      [options.database],
    );
    if (dbResult.rowCount === 0) {
      await client.query(`CREATE DATABASE "${options.database}"`);
    }

    const schemaExists = await client.query(
      `
      SELECT schema_name FROM information_schema.schemata WHERE schema_name = $1
    `,
      [options.schema],
    );

    if (schemaExists.rowCount === 0) {
      await client.query(`CREATE SCHEMA IF NOT EXISTS "${options.schema}"`);
    }
  } catch (error) {
    console.error('Error while create database or schema:', error);
  } finally {
    await client.end();
  }
}

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: envConfigService.getDbHost(),
  port: envConfigService.getDbPort(),
  username: envConfigService.getDbUsername(),
  password: envConfigService.getDbPassword(),
  database: envConfigService.getDbName(),
  schema: envConfigService.getDbSchema(),
  entities: [path.resolve(__dirname, './schemas/**/*.schema.{ts,js}')],
  migrations: [path.join(__dirname, './migrations/**/*.{ts,js}')],
  synchronize: false,
  migrationsRun: false,
};

export default registerAs('typeorm', () => dataSourceOptions);
export const connectionSource = new DataSource(dataSourceOptions);
