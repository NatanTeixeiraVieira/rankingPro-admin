import {
  Injectable,
  Scope,
  ConsoleLogger,
  LoggerService,
} from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class NestjsLoggerService
  extends ConsoleLogger
  implements LoggerService {}
