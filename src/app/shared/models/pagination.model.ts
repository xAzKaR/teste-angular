/**
 * Model de configuração de paginação
 *
 * @interface PageableModel
 */
export interface PageableModel {
    "sort": PaginationSortModel,
    "offset": number,
    "pageSize": number,
    "pageNumber": number,
    "paged": boolean,
    "unpaged": boolean
}

/**
 * Model de ordenação de paginação
 *
 * @interface PageableSortModel
 */
export interface PaginationSortModel {
  "unsorted": boolean,
  "sorted": boolean,
  "empty": boolean
}
