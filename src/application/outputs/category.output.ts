import { Category } from '@/domain/entities/category/category.entity';
import { OutputMapper } from './output-mapper';

export type CategoryOutput = {
  name: string;
  description: string;
  events: EventOutput[];
};

type EventOutput = {
  name: string;
  operation: string;
  value: number;
};

export class CategoryOutputMapper extends OutputMapper<
  Category,
  CategoryOutput
> {}
