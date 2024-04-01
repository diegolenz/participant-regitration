export interface Page<T> {
    content: T[];

    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: any;
    numberOfElements: number;
    first: boolean
}

export interface Pageable {
    sort: any;
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean
}
