import { ISuccessResponse } from '../interface';

export function getSuccessResp(data: any): ISuccessResponse {
  const successResp: ISuccessResponse = {
    data
  };

  return successResp;
}
