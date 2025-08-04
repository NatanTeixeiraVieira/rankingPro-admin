import { DatabaseModule } from './infra/database/database.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvConfigServiceModule } from './infra/env-config-service/env-config-service.module';

@Module({
  imports: [EnvConfigServiceModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
