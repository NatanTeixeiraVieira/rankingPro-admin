import { CategoryRepository } from '@/domain/repositories/category.repository';
import {
  CategoryOutput,
  CategoryOutputMapper,
} from '../../outputs/category.output';
import { UseCase } from '../use-case';
import { Category } from '@/domain/entities/category/category.entity';
import { UnitOfWork } from '../../unit-of-work/unit-of-work';
import { LoggerService } from '@/application/logger/logger.service';

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
    private readonly categoryOutputMapper: CategoryOutputMapper,
    private readonly uow: UnitOfWork,
    private readonly loggerService: LoggerService,
  ) {}

  async execute(input: Input): Promise<Output> {
    this.loggerService.setContext(CreateCategoryUseCase.name);
    this.loggerService.log(`input: ${JSON.stringify(input)}`);

    const { category, description, events } = input;
    return await this.uow.execute(async () => {
      const categoryEntity = Category.create({
        name: category,
        description,
        events,
      });

      await this.categoryRepository.create(categoryEntity);

      return this.categoryOutputMapper.toOutput(categoryEntity);
    });
  }
}
