export interface Pageable<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
}
