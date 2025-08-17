import { Column, Entity, OneToMany } from 'typeorm';
import { Schema } from '../schema';
import { EventSchema } from './event.schema';

@Entity('category')
export class CategorySchema extends Schema {
  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  name: string;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  description: string;

  @OneToMany(() => EventSchema, (event) => event.category)
  events: EventSchema[];
}
