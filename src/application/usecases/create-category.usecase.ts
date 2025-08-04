import { CategoryRepository } from '@/domain/repositories/category.repository';
import {
  CategoryOutput,
  CategoryOutputMapper,
} from '../outputs/category.output';
import { UseCase } from './use-case';
import { Category } from '@/domain/entities/category/category.entity';
import { UnitOfWork } from '../unit-of-work/unit-of-work';

type EventInput = {
  name: string;
  operation: string;
  value: number;
};

type Input = {
  category: string;
  description: string;
  events: EventInput[];
};

type Output = CategoryOutput;

export class CreateCategoryUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly outputMapper: CategoryOutputMapper,
    private readonly uow: UnitOfWork,
  ) {}

  async execute({ description, events, category }: Input): Promise<Output> {
    return this.uow.execute(async () => {
      const categoryEntity = Category.create({
        name: category,
        description,
        events,
      });

      await this.categoryRepository.create(categoryEntity);

      return this.outputMapper.toOutput(categoryEntity);
    });
  }
}
