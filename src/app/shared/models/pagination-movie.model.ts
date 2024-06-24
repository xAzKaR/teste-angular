import { MovieModel } from "./movie.model";
import { PageableModel, PaginationSortModel } from "./pagination.model";

/**
 * Model para lista de filmes com paginação
 *
 * @interface PaginationMovieModel
 */
export interface PaginationMovieModel {
    content: MovieModel[];
    pageable: PageableModel;
    sort: PaginationSortModel;
    totalPages: number,
    totalElements: number,
    last: boolean,
    size: number,
    number: number,
    first: boolean,
    numberOfElements: number,
    empty: boolean
}
