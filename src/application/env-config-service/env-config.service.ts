export interface EnvConfigService {
  getDbHost(): string;
  getDbPort(): number;
  getDbUsername(): string;
  getDbPassword(): string;
  getDbName(): string;
  getDbSchema(): string;
}
