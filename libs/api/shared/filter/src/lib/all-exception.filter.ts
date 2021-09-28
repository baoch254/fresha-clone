import { InternalException } from '@fresha/api/shared/exception';
import { Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(err: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const resp = ctx.getResponse<Response>();

    this.logger.error(err);

    const internalError = new InternalException(err);
    const status = internalError.getStatus();
    return resp.status(status).json({
      statusCode: status,
      message: internalError.getResponse(),
      key: internalError.key,
      timestamp: new Date().toISOString()
    });
  }
}
