import { HttpException, HttpStatus } from '@nestjs/common';

export class AppException extends HttpException {
  private root: Error;
  private log: string; // error logging
  private key: string; // error message code for i8n

  constructor(statusCode: HttpStatus, root: Error, msg: string, log: string, key: string) {
    super(msg, statusCode);
    this.root = root;
    this.log = log;
    this.key = key;
  }

  public getLog() {
    return this.log;
  }

  public getKey() {
    return this.key;
  }

  public getRoot() {
    return this.root;
  }
}
