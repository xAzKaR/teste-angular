import { Component, OnInit } from '@angular/core';

import { PageChangedEvent } from 'ngx-bootstrap/pagination';

import { MovieService } from '@services/movie.service';
import { YearService } from '@services/year.service';
import { PaginationMovieModel } from '@models/pagination-movie.model';

/**
 * Componente para consulta de lista de filmes
 */
@Component({
  selector: 'app-movie-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class MovieListComponent implements OnInit {
  /** Mensagem de erro retornada por requisições HTTP */
  errorMessage: string;

  /** Página com lista de filmes */
  data!: PaginationMovieModel;

  /** Configuração de total de ítens por pagina */
  itemsPerPage: number;
  /** Página atual */
  currentPage!: number;
  /** Total de filmes */
  totalElements!: number;

  /** Lista de anos apresentados no campo Year */
  years: number[];

  /** Ano selecionado no campo Year */
  year?: number;
  /** Opção selecionada no campo Winner */
  winner?: boolean;

  /**
   * Construtor padrão da classe
   *
   * @param movieService
   * @param yearService
   */
  constructor(
    private movieService: MovieService,
    private yearService: YearService
  ) {
    this.errorMessage = '';
    this.itemsPerPage = 15;
    this.currentPage = 1;
    this.totalElements = 0;

    this.years = yearService.mountPreviousYears(50);
    this.clearData();
  }

  /**
   * Executado após o Angular ter inicializado todas as entradas dos componentes com seus valores iniciais.
   * O ngOnInit de um componente é executado exatamente uma vez.
   */
  ngOnInit(): void {
    this.search();
  }

  /**
   * Consulta página de filmes
   */
  search() {
    this.clearData();
    this.movieService
      .getAllPaging(
        this.currentPage - 1,
        this.itemsPerPage,
        this.year,
        this.winner
      )
      .subscribe({
        next: (data: any) => {
          this.data = data;
          if (this.totalElements !== data.totalElements) {
            this.totalElements = data.totalElements;
          }
        },
        error: (error) => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
        },
      });
  }

  /**
   * Limpa lista de filmes
   */
  clearData(): void {
    this.data = {
      content: [],
      pageable: {
        sort: {
          unsorted: true,
          sorted: false,
          empty: true,
        },
        offset: 0,
        pageSize: 15,
        pageNumber: 15,
        paged: true,
        unpaged: false,
      },
      totalPages: 0,
      totalElements: 0,
      last: true,
      size: 15,
      number: 15,
      sort: {
        unsorted: true,
        sorted: false,
        empty: true,
      },
      first: true,
      numberOfElements: 0,
      empty: true,
    };
  }

  /**
   * Executado sempre que a páginação for alterada
   *
   * @param event PageChangedEvent
   */
  onPageChange(event: PageChangedEvent): void {
    this.currentPage = event.page;
    this.search();
  }

  /**
   * Executado sempre que for selecionado um ano diferente
   *
   * @param event any
   */
  onChangeYear(event: any): void {
    this.year = event.target.value;
    this.search();
  }

  /**
   * Executado sempre que for alterado o valor do campo winner
   *
   * @param event any
   */
  onChangeWinner(event: any): void {
    this.winner = event.target.value;
    this.search();
  }
}
