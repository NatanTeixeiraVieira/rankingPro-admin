import { Entity } from '../entity';

export type EventProps = {
  name: string;
  operation: string;
  value: number;
};

export interface Event extends Readonly<EventProps> {}

export class Event extends Entity<EventProps> {}
