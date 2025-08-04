import { EnvConfigService } from '@/application/env-config-service/env-config.service';
import { ConfigService } from '@nestjs/config';

export class NestjsEnvConfigService implements EnvConfigService {
  constructor(private readonly envConfigService: ConfigService) {}

  getDbHost(): string {
    return this.envConfigService.get<string>('DB_HOST') as string;
  }

  getDbPort(): number {
    return Number(this.envConfigService.get<string>('DB_PORT') as string);
  }

  getDbUsername(): string {
    return this.envConfigService.get<string>('DB_USERNAME') as string;
  }

  getDbPassword(): string {
    return this.envConfigService.get<string>('DB_PASSWORD') as string;
  }

  getDbName(): string {
    return this.envConfigService.get<string>('DB_NAME') as string;
  }

  getDbSchema(): string {
    return this.envConfigService.get<string>('DB_SCHEMA') as string;
  }
}
