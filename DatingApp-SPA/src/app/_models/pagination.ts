export interface Pagination {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsperPage: number;
}

export class PaginatedResult<T> {
    result: T;
    pagination: Pagination;
}
