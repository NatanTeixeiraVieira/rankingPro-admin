import { Category } from '@/domain/entities/category/category.entity';
import { CategoryRepository } from '@/domain/repositories/category.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CategorySchema } from '../../schemas/category/category.schema';
import { Repository } from 'typeorm';
import { CategoryTypeormRepositoryMapper } from './category-typeorm-repository-mapper';

export class CategoryTypeormRepository implements CategoryRepository {
  constructor(
    @InjectRepository(CategorySchema)
    private readonly categoryRepository: Repository<CategorySchema>,
    private readonly categoryTypeormRepositoryMapper: CategoryTypeormRepositoryMapper,
  ) {}

  async create(category: Category): Promise<void> {
    const schema = this.categoryTypeormRepositoryMapper.toSchema(category);
    await this.categoryRepository.save(schema);
  }
}
