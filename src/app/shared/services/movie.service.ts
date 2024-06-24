import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '@environments/environment';

/**
 * Serviço para filmes
 */
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  /** URI padrão */
  uri: string = environment.apiUrl + '/movies';

  /**
   * Construtor padrão da classe
   *
   * @param http HttpClient
   */
  constructor(private http: HttpClient) {}

  /**
   * Retorna lista completa de filmes
   *
   * @param year number
   * @param winner boolean
   * @return Observable<Object>
   */
  getAll(year: number, winner: boolean = true): Observable<any> {
    let params = new HttpParams().set('year', year).set('winner', winner);

    return this.http.get(this.uri, { params: params });
  }

  /**
   * Retorna lista de filmes de uma página
   *
   * @param page number
   * @param size number
   * @param year number
   * @param winner boolean
   * @return Observable<Object>
   */
  getAllPaging(
    page: number,
    size: number,
    year?: number,
    winner?: boolean
  ): Observable<any> {
    let params = new HttpParams().set('page', page).set('size', size);

    if (year !== undefined) params = params.set('year', year);
    if (winner !== undefined) params = params.set('winner', winner);

    return this.http.get(this.uri, { params: params });
  }
}
