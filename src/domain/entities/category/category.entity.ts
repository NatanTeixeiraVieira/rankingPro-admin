import { Data } from '../../decorators/data.decorator';
import { RootEntity } from '../root-entity';
import { Event } from './event.entity';

export type CategoryProps = {
  name: string;
  description: string;
  events: Event[];
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
export class Category extends RootEntity<CategoryProps> {
  static create(props: CreateCategoryProps): Category {
    const entities: CategoryProps = {
      ...props,
      events: props.events.map(
        ({ name, operation, value }) => new Event({ name, operation, value }),
      ),
    };
    return new Category(entities);
  }
}
