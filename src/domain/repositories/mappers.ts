import { RootEntity, BaseProps } from '../entities/root-entity';

export interface RepositoryEntityMapper<
  Schema,
  E extends RootEntity<BaseProps>,
> {
  toEntity(schema: Schema): E;
}

export interface RepositorySchemaMapper<Schema, E> {
  toSchema(entity: E): Schema;
}

export interface RepositoryMapper<Schema, E extends RootEntity<BaseProps>>
  extends RepositoryEntityMapper<Schema, E>,
    RepositorySchemaMapper<Schema, E> {}
