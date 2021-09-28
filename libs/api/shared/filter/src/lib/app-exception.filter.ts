import { AppException } from '@fresha/api/shared/exception';
import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { Response } from 'express';

@Catch(AppException)
export class AppExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AppExceptionFilter.name);

  catch(err: AppException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const resp = ctx.getResponse<Response>();

    this.traceError(err);

    const status = err.getStatus();
    return resp.status(status).json({
      statusCode: status,
      message: err.getResponse(),
      key: err.key,
      log: process.env.production ? null : err.log,
      timestamp: new Date().toISOString()
    });
  }

  traceError(err: AppException) {
    let traceErr = err;
    while (traceErr.root != null) {
      this.logger.error(traceErr.stack);

      if (!(traceErr.root instanceof AppException)) {
        this.logger.error(traceErr.root.stack);
        break;
      }

      traceErr = traceErr.root;
    }
  }
}
