import { Global, Module } from '@nestjs/common';
import { UnitOfWorkTypeOrm } from './typeorm/unit-of-work-typeorm';
import { Providers } from '@/application/constants/providers';

@Global()
@Module({
  providers: [{ provide: Providers.UNIT_OF_WORK, useClass: UnitOfWorkTypeOrm }],
  exports: [Providers.UNIT_OF_WORK],
})
export class UnitOfWorkModule {}
