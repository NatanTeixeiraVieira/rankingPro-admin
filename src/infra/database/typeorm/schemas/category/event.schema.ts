import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Schema } from '../schema';
import { CategorySchema } from './category.schema';

@Entity('event')
export class EventSchema extends Schema {
  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  name: string;

  @Column({
    name: 'operation',
    type: 'varchar',
    length: 1,
    nullable: false,
  })
  operation: string;

  @Column({
    name: 'value',
    type: 'int',
    nullable: false,
  })
  value: number;

  @JoinColumn({ name: 'category_id' })
  @ManyToOne(() => CategorySchema, (category) => category.events)
  category: CategorySchema;
}
