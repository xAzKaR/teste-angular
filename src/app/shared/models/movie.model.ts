/**
 * Model de dados de filme
 *
 * @interface MovieModel
 */
export interface MovieModel {
    id: number;
    year: number;
    title: string;
    studios: string[];
    producers: string[];
    winner: boolean;
}
