import { Injectable } from '@angular/core';

/**
 * Serviço com funcionalidades relacionadas a Anos
 */
@Injectable({
  providedIn: 'root'
})
export class YearService {

  /**
   * Monta lista decrescente de anos a partir do ano corrente
   *
   * @param numYears: number Quantidade de anos
   * @return number[]
   */
  mountPreviousYears(numYears: number = 1): number[] {
    const year = new Date().getFullYear();
    return Array.from({length: numYears}, (v, i) => year - numYears + i + 1).reverse();
  }
}
