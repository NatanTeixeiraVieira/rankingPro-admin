import { UnitOfWork } from '@/application/unit-of-work/unit-of-work';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export class UnitOfWorkTypeOrm implements UnitOfWork {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async execute<T>(work: () => Promise<T>): Promise<T> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await work();
      await queryRunner.commitTransaction();
      return result;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
