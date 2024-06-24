import { Component } from '@angular/core';

import { ProducerMaxMinIntervalModel } from '@models/producer.model';
import { ProducerService } from '@services/producer.service';

/**
 *  Componente para apresentação de Intervalo máximo e mínimo de prêmios para produtor de filme
 */
@Component({
  selector: 'app-winner-producer-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class WinnerProducerListComponent {

  /** Mensagem de erro retornada por requisições HTTP */
  errorMessage: string;

  /** Intervalo máximo e mínimo de prêmios para produtor de filme */
  data!: ProducerMaxMinIntervalModel;

  /**
   * Construtor padrão da classe
   *
   * @param producerService
   */
  constructor(private producerService: ProducerService) {
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
   * Consulta intervalo máximo e mínimo de prêmios para produtor de filme
   */
  getData(): void {
    this.clearData();
    this.producerService
        .getPrizeRange()
        .subscribe({
          next: (data: any) => {
            this.data = data;
          },
          error: error => {
              this.errorMessage = error.message;
              console.error('There was an error!', error);
          }
        });
  }

  /**
   * Limpa intervalo máximo e mínimo de prêmios para produtor de filme
   */
  clearData(): void {
    this.data = {min: [], max: []};
  }
}
