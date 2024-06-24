import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { MovieService } from '@services/movie.service';
import { YearService } from '@services/year.service';

import { MovieModel } from '@models/movie.model';

/**
 *  Componente para apresentação de lista de filmes vencedores de prêmios por ano
 */
@Component({
  selector: 'app-winner-movie-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class WinnerMovieListComponent {

  /** Mensagem de erro retornada por requisições HTTP */
  errorMessage: string;

  /** ícone de lupa */
  faSearch = faMagnifyingGlass;

  /** Lista de filmes */
  data: MovieModel[];

  /** Formulário de consulta de filmes */
  form: FormGroup;

 /** Lista de anos apresentados no campo Year */
  years:number[];

  /**
   * Construtor padrão da classe
   *
   * @param movieService
   * @param formBuilder
   * @param yearService
   */
  constructor(
    private movieService: MovieService,
    private formBuilder: FormBuilder,
    private yearService: YearService
  ) {
    this.errorMessage = '';
    this.data = [];
    this.years =  this.yearService.mountPreviousYears(50);
    this.form = this.formBuilder.group({
      year: [null, Validators.required]
    });

    this.clearData();
  }

   /**
   * Consulta lista de filmes
   */
  search(): void {
    this.clearData();

    if (this.form.invalid) {
      return;
    }

    this.movieService
        .getAll(this.form.value.year)
        .subscribe({
          next: (data: any) => {
            this.data= data;
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
