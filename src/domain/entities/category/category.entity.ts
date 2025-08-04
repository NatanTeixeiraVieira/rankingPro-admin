import { Data } from '../../decorators/data.decorator';
import { Entity } from '../entity';
import { EventProps } from './event.entity';

export type CategoryProps = {
  name: string;
  description: string;
  events: EventProps[];
};

export type CreateCategoryProps = {
  name: string;
  description: string;
  events: {
    name: string;
    operation: string;
    value: number;
  }[];
};

export interface Category extends Readonly<CategoryProps> {}

@Data()
export class Category extends Entity<CategoryProps> {
  static create(props: CreateCategoryProps): Category {
    Category.validate(props);
    return new Category(props);
  }

  private static validate(props: CategoryProps) {}
}
