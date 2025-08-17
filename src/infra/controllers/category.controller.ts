import { CreateCategoryUseCase } from '@/application/usecases/category/create-category.usecase';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { Topics } from '@/application/constants/topics';

@Controller()
export class CategoryController {
  constructor(private readonly createCategoryUseCase: CreateCategoryUseCase) {}

  @EventPattern(Topics.CREATE_CATEGORY)
  async createCateogy(@Payload() categoryDto: CreateCategoryDto) {
    await this.createCategoryUseCase.execute(categoryDto);
  }
}
