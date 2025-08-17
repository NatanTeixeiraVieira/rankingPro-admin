import { EventDto } from './event.dto';

export class CreateCategoryDto {
  readonly category: string;
  readonly description: string;
  readonly events: EventDto[];
}
