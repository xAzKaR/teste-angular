import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '@environments/environment';

/**
 * Serviço para estúdios
 */
@Injectable({
  providedIn: 'root'
})
export class StudioService {

  /** URI padrão */
  uri: string = environment.apiUrl;

   /**
   * Construtor padrão da classe
   *
   * @param http HttpClient
   */
   constructor(private http: HttpClient) {}

  /**
  * Retorna lista de estúdios
  *
  * @return Observable<Object>
  */
  getAll(): Observable<any> {
    return this.http.get(this.uri + '/movies?projection=studios-with-win-count');
  }
}
