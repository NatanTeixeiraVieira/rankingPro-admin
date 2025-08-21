import { OutputMapper } from "@/application/outputs/output-mapper";
import { UnitOfWork } from "@/application/unit-of-work/unit-of-work";
import { CategoryRepository } from "@/domain/repositories/category.repository";
import { CreateCategoryUseCase } from "../../create-category.usecase";
import { CategoryOutputMapper } from "@/application/outputs/category.output";
import { LoggerService } from "@/application/logger/logger.service";
import { Category } from "@/domain/entities/category/category.entity";

jest.mock('@/domain/entities/category/category.entity.ts');

describe('RegisterUseCase unit tests', () => {
	let sut: CreateCategoryUseCase;
	let categoryRepository: CategoryRepository;
	let categoryOutputMapper: CategoryOutputMapper;
	let uow: UnitOfWork;
	let loggerService: LoggerService;

	beforeEach(() => {
		jest.clearAllMocks();

		categoryRepository = {
			create: jest.fn(),
		} as unknown as CategoryRepository;

    categoryOutputMapper = {
      toOutput: jest.fn(),
    } as unknown as CategoryOutputMapper;

		uow = {
			execute: jest.fn().mockImplementation((fn) => fn()),
		};

    loggerService = {
      setContext: jest.fn(),
      log: jest.fn(),
    } as unknown as LoggerService;

		sut = new CreateCategoryUseCase(
			categoryRepository,
      categoryOutputMapper,
      uow,
      loggerService,
		);
	});

	it('should create a category', async () => {
    const input = {
      category: 'Movie',
      description: 'some description',
      events: [
        { name: 'event1', operation: 'sum', value: 10 },
        { name: 'event2', operation: 'subtraction', value: 5 },
      ],
    }

    await sut.execute(input)

    expect(uow.execute).toHaveBeenCalledTimes(1);
    expect(categoryRepository.create).toHaveBeenCalledTimes(1);
    expect(categoryOutputMapper.toOutput).toHaveBeenCalledTimes(1);
    expect(loggerService.setContext).toHaveBeenCalledWith('CreateCategoryUseCase');
    expect(loggerService.log).toHaveBeenCalledWith(`input: ${JSON.stringify(input)}`);
		expect(Category.create).toHaveBeenCalledTimes(1);
	});
});
