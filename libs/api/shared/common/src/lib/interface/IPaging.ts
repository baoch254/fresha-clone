export class IPaging {
  page: number;
  limit: number;
  cursor?: number;
  nextCursor?: number;
  total?: number;

  constructor(page, limit, cursor) {
    this.page = page <= 0 ? 1 : page;
    this.limit = limit;
    this.cursor = isNaN(cursor) ? null : cursor;
  }
}
