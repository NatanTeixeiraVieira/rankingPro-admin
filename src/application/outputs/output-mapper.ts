import { RootEntity, BaseProps } from '@/domain/entities/root-entity';

export abstract class OutputMapper<
  E extends RootEntity<BaseProps>,
  Output extends object,
> {
  toOutput(entity: E): Output {
    return entity.toJSON() as Output;
  }
}
