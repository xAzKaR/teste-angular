import { Component } from '@angular/core';

import { StudioListModel } from '@models/studio.model';
import { StudioService } from '@services/studio.service';

/**
 *  Componente para apresentação de lista de estudios
 */
@Component({
  selector: 'app-winner-studio-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class WinnerStudioListComponent {

  /** Mensagem de erro retornada por requisições HTTP */
  errorMessage: string;

  /** lista de estudios */
  data!: StudioListModel;

  constructor(private studioService: StudioService) {
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
   * Consulta lista de estudios
   */
  getData(): void {
    this.clearData();
    this.studioService
        .getAll()
        .subscribe({
          next: (data: any) => {
            this.data.studios = data.studios;
          },
          error: error => {
              this.errorMessage = error.message;
              console.error('There was an error!', error);
          }
        });
  }

  /**
   * Limpa lista de estudios
   */
  clearData(): void {
    this.data = {studios: []};
  }
}
