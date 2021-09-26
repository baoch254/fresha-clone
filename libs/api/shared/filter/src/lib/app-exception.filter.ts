import { AppException, InternalException } from '@fresha/api/shared/exception';
import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { Response } from 'express';

@Catch(AppException)
export class AppExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AppExceptionFilter.name);

  catch(err: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const resp = ctx.getResponse<Response>();

    if (err instanceof AppException) {
      this.logger.error(err.getRoot());
      const status = err.getStatus();
      return resp.status(status).json({
        statusCode: status,
        message: err.getResponse(),
        key: err.getKey(),
        log: process.env.production ? null : err.getLog(),
        timestamp: new Date().toISOString()
      });
    }

    const internalError = new InternalException(err);
    const status = internalError.getStatus();
    return resp.status(status).json({
      statusCode: status,
      message: internalError.getResponse(),
      key: internalError.getKey(),
      timestamp: new Date().toISOString()
    });
  }
}
