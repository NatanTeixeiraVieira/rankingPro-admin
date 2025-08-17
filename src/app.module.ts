import { LoggerModule } from './infra/logger/logger.module';
import { AdminModule } from './infra/admin.module';
import { DatabaseModule } from './infra/database/database.module';
import { Module } from '@nestjs/common';
import { EnvConfigServiceModule } from './infra/env-config-service/env-config-service.module';
import { UnitOfWorkModule } from './infra/unit-of-work/unit-of-work.module';
import { ExceptionFiltersModule } from './infra/exception-filters/exception-filters.module';

@Module({
  imports: [
    LoggerModule,
    AdminModule,
    EnvConfigServiceModule,
    DatabaseModule,
    UnitOfWorkModule,
    ExceptionFiltersModule,
  ],
})
export class AppModule {}
