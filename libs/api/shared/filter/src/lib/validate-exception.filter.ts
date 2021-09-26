import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { Response } from 'express';

export interface IValidateError {
  status: number;
  message: string | string[];
  error: string;
}

@Catch(BadRequestException)
export class ValidateExceptionFilter implements ExceptionFilter {
  catch(err: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const resp = ctx.getResponse<Response>();
    const status = err.getStatus();

    const responseError = err.getResponse() as IValidateError;

    return resp.status(status).json({
      statusCode: status,
      message: responseError.message,
      key: 'VALIDATE_FAILED',
      timestamp: new Date().toISOString()
    });
  }
}
