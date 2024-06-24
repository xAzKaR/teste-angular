import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '@environments/environment';

/**
 * Serviço para Produtor de filmes
 */
@Injectable({
  providedIn: 'root'
})
export class ProducerService {

  /** URI padrão */
  uri: string = environment.apiUrl;

   /**
   * Construtor padrão da classe
   *
   * @param http HttpClient
   */
   constructor(private http: HttpClient) {}

   /**
    * Retorna Intervalo de prêmios
    *
    * @return Observable<Object>
    */
  getPrizeRange(): Observable<any> {
    return this.http.get(this.uri + '/movies?projection=max-min-win-interval-for-producers');
  }
}
