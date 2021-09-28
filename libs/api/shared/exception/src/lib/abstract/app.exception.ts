import { HttpException, HttpStatus } from '@nestjs/common';

export class AppException extends HttpException {
  private _root: Error;
  private _log: string; // error logging
  private _key: string; // error message code for i8n

  constructor(statusCode: HttpStatus, root: Error, msg: string, log: string, key: string) {
    super(msg, statusCode);
    this._root = root;
    this._log = log;
    this._key = key;
  }

  public get log() {
    return this._log;
  }

  public get key() {
    return this._key;
  }

  public get root() {
    return this._root;
  }
}
