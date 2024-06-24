import { Component } from '@angular/core';

import { WinnerYearListModel } from '@models/winner.model';
import { WinnerService } from '@services/winner.service';

/**
 *  Componente para apresentação de lista de filmes vencedores de prêmios por ano
 */
@Component({
  selector: 'app-winner-multiple-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class WinnerMultipleListComponent {

  /** Mensagem de erro retornada por requisições HTTP */
  errorMessage: string;

  /** Lista vencedores de prêmios por ano */
  data!: WinnerYearListModel;

  /**
   * Construtor padrão da classe
   *
   * @param winnerService
   */
  constructor(private winnerService: WinnerService) {
    this.errorMessage = '';
    this.clearData();
  }

  /**
   * Executado após o Angular ter inicializado todas as entradas dos componentes com seus valores iniciais.
   * O ngOnInit de um componente é executado exatamente uma vez.
   */
  ngOnInit(): void {
    this.getData();
  }

   /**
   * Consulta lista de vencedores de prêmios
   */
  getData(): void {
    this.clearData();
    this.winnerService
        .getAll()
        .subscribe({
          next: (data: any) => {
            this.data.years = data.years;
          },
          error: error => {
              this.errorMessage = error.message;
              console.error('There was an error!', error);
          }
        });
  }

  /**
   * Limpa lista de vencedores de prêmios
   */
  clearData(): void {
    this.data = {years: []};
  }
}
