import { Category } from '../entities/category/category.entity';
import { CreateRepository } from './repository';

export interface CategoryRepository extends CreateRepository<Category> {}
