import { Data } from '@/domain/decorators/data.decorator';
import { RootEntity } from '../root-entity';

export type PlayerProps = {
  phoneNumber: string;
  email: string;
  categoryId: string;
  name: string;
  ranking: string;
  rankingPosition: number;
  playerImageUrl: string;
};

@Data()
export class Player extends RootEntity<PlayerProps> {}
