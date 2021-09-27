import { ISuccessResponse, IPaging } from '../interface';

export function getSuccessListResp(data: any, total: number, paging: IPaging): ISuccessResponse {
  const successResp: ISuccessResponse = {
    data,
    paging: {
      ...paging,
      nextCursor: data.length ? data[data.length - 1].id : null,
      total
    }
  };

  return successResp;
}
