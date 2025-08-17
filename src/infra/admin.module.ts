import { Module } from '@nestjs/common';
import { CategoryController } from './controllers/category.controller';
import { Providers } from '@/application/constants/providers';
import { UnitOfWork } from '@/application/unit-of-work/unit-of-work';
import { CreateCategoryUseCase } from '@/application/usecases/category/create-category.usecase';
import { CategoryOutputMapper } from '@/application/outputs/category.output';
import { CategoryRepository } from '@/domain/repositories/category.repository';
import { CategoryTypeormRepository } from './database/typeorm/repositories/category/category-typeorm.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategorySchema } from './database/typeorm/schemas/category/category.schema';
import { CategoryTypeormRepositoryMapper } from './database/typeorm/repositories/category/category-typeorm-repository-mapper';
import { LoggerService } from '@/application/logger/logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategorySchema])],
  controllers: [CategoryController],
  providers: [
    CategoryTypeormRepositoryMapper,
    {
      provide: Providers.CATEGORY_OUTPUT_MAPPER,
      useClass: CategoryOutputMapper,
    },
    {
      provide: Providers.CATEGORY_REPOSITORY,
      useClass: CategoryTypeormRepository,
    },
    {
      provide: CreateCategoryUseCase,
      useFactory: (
        categoryRepository: CategoryRepository,
        outputMapper: CategoryOutputMapper,
        uow: UnitOfWork,
        loggerService: LoggerService,
      ) => {
        return new CreateCategoryUseCase(
          categoryRepository,
          outputMapper,
          uow,
          loggerService,
        );
      },
      inject: [
        Providers.CATEGORY_REPOSITORY,
        Providers.CATEGORY_OUTPUT_MAPPER,
        Providers.UNIT_OF_WORK,
        Providers.LOGGER_SERVICE,
      ],
    },
  ],
})
export class AdminModule {}
