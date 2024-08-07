import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteModel } from '@app/shared/models/cliente.model';
import { ClienteService } from '@app/shared/services/cliente.service';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-winner-client-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class WinnerClientListComponent {
  /** Mensagem de erro retornada por requisições HTTP */
  errorMessage: string;

  /** ícone de lupa */
  faSearch = faMagnifyingGlass;

  /** Lista de filmes */
  data: ClienteModel[];

  /** Formulário de consulta de filmes */
  form: FormGroup;

  /**
   * Construtor padrão da classe
   *
   * @param clienteService
   * @param formBuilder
   */
  constructor(
    private clienteService: ClienteService,
    private formBuilder: FormBuilder,
  ) {
    this.errorMessage = '';
    this.data = [];
    this.form = this.formBuilder.group({
      nome: [null, Validators.required]
    });

    this.clearData();
  }

  buscarTodosClientes() : void {
    this.clienteService
    .getAll()
    .subscribe({
      next: (data: any) => {
          this.data = data;
      },
      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    })
  }

  /**
  * Consulta lista de clientes
  */
  search(): void {
    this.clearData();

    if (this.form.invalid) {
      return;
    }

    this.clienteService
      .getAll()
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
   * Limpa lista de filmes
   */
  clearData(): void {
    this.data = [];
  }
}
