import { IPaging } from '.';

export interface ISuccessResponse {
  data: any;
  paging?: IPaging;
  filter?: any;
}
