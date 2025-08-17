import { BaseProps, RootEntity } from '../entities/root-entity';

export interface Repository<E extends RootEntity<BaseProps>>
  extends GetByIdRepository<E>,
    CreateRepository<E>,
    UpdateRepository<E>,
    DeleteRepository<E> {}

export interface GetByIdRepository<E extends RootEntity<BaseProps>> {
  getById(id: string): Promise<E | null>;
}

export interface CreateRepository<E extends RootEntity<BaseProps>> {
  create(entity: E): Promise<void>;
}

export interface UpdateRepository<E extends RootEntity<BaseProps>> {
  update(entity: E): Promise<void>;
}

export interface DeleteRepository<E extends RootEntity<BaseProps>> {
  delete(entity: E): Promise<void>;
}
