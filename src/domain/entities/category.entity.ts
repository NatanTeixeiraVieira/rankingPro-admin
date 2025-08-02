import { Data } from '../decorators/data.decorator';
import { Entity } from './entity';
import { EventProps } from './event.entity';

export type CategoryProps = {
  name: string;
  description: string;
  events: EventProps[];
};

export interface Category extends Readonly<CategoryProps> {}

@Data()
export class Category extends Entity<CategoryProps> {}
