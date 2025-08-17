import { Category } from '@/domain/entities/category/category.entity';
import {
  RepositoryEntityMapper,
  RepositorySchemaMapper,
} from '@/domain/repositories/mappers';
import { CategorySchema } from '../../schemas/category/category.schema';
import { Event } from '@/domain/entities/category/event.entity';
import { EventSchema } from '../../schemas/category/event.schema';

export class CategoryTypeormRepositoryMapper
  implements
    RepositoryEntityMapper<CategorySchema, Category>,
    RepositorySchemaMapper<CategorySchema, Category>
{
  toEntity(schema: CategorySchema): Category {
    return Category.with({
      id: schema.id,
      name: schema.name,
      description: schema.description,
      events: schema.events.map(
        (event) =>
          new Event({
            name: event.name,
            operation: event.operation,
            value: event.value,
            audit: {
              createdAt: event.createdAt,
              updatedAt: event.updatedAt,
              deletedAt: event.deletedAt,
            },
          }),
      ),
      audit: {
        createdAt: schema.createdAt,
        updatedAt: schema.updatedAt,
        deletedAt: schema.deletedAt,
      },
    });
  }

  toSchema(entity: Category): CategorySchema {
    return CategorySchema.with({
      id: entity.id,
      name: entity.name,
      description: entity.description,
      events: entity.events.map((event) =>
        EventSchema.with({
          name: event.name,
          operation: event.operation,
          value: event.value,
          createdAt: event.audit.createdAt,
          updatedAt: event.audit.updatedAt,
          deletedAt: event.audit.deletedAt,
        }),
      ),
      createdAt: entity.audit.createdAt,
      updatedAt: entity.audit.updatedAt,
      deletedAt: entity.audit.deletedAt,
    });
  }
}
