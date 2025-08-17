import { Providers } from '@/application/constants/providers';
import { LoggerService } from '@/application/logger/logger.service';
import { Catch, ArgumentsHost, Inject } from '@nestjs/common';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';

@Catch()
export class AllExceptionFilter extends BaseRpcExceptionFilter {
  constructor(
    @Inject(Providers.LOGGER_SERVICE)
    private readonly logger: LoggerService,
  ) {
    super();
  }

  catch(exception: unknown, host: ArgumentsHost) {
    this.logger.error(
      'Erro capturado no microsserviço',
      exception instanceof Error ? exception.stack : String(exception),
    );

    // If it's already an RpcException, just pass it along
    if (exception instanceof RpcException) {
      return super.catch(exception, host);
    }

    // If it's your custom domain error
    if (exception instanceof Error && 'statusCode' in exception) {
      const statusCode = (exception as any).statusCode ?? 400;
      const message = exception.message ?? 'Erro de domínio';
      return super.catch(
        new RpcException({ status: statusCode, message }),
        host,
      );
    }

    // If it's a generic/unexpected error, standardize it
    return super.catch(
      new RpcException({
        status: 500,
        message: 'Erro interno',
      }),
      host,
    );
  }
}
