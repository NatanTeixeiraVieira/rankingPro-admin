import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestjsEnvConfigService } from './nestjs/nestjs-env-config.service';
import { Providers } from '@/application/constants/providers';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    {
      provide: Providers.ENV_CONFIG_SERVICE,
      useClass: NestjsEnvConfigService,
    },
  ],
  exports: [Providers.ENV_CONFIG_SERVICE],
})
export class EnvConfigServiceModule {}
