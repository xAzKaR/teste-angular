import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})

export class ClienteService {
  uri: string = environment.apiUrl + '/cliente';

/**
   * Construtor padrão da classe
   *
   * @param http HttpClient
   */
constructor(private http: HttpClient) {}

getAll(): Observable<any> {
  return this.http.get(this.uri);
}

getAllPaging(
  page: number,
  size: number,
  qtd?: 1
): Observable<any> {
  let params = new HttpParams().set('page', page).set('qtd', 1).set('size', size);
  return this.http.get(this.uri, { params: params });
}

}
