export interface paginatedResponse<T> {
  content: T[];
  first: boolean;
  last: boolean;
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPage: number;
}
