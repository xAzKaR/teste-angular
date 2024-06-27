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

  /** Configuração de total de ítens por pagina */
  readonly ITENS_PER_PAGE = 15;

  /** Mensagem de erro retornada por requisições HTTP */
  errorMessage: string;

  /** Página com lista de filmes */
  data!: PaginationMovieModel;

  /** Página atual */
  currentPage!: number;
  /** Total de filmes */
  totalElements!: number;
  /** Identifica mudanças nos filtros */
  changeFilter: boolean;

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
    this.currentPage = 1;
    this.totalElements = 0;
    this.changeFilter = false;

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

    if (this.changeFilter) {
      this.clearPagination();
    }
-
    this.movieService
      .getAllPaging(
        this.currentPage - 1,
        this.ITENS_PER_PAGE,
        this.year,
        this.winner
      )
      .subscribe({
        next: (data: any) => {
          this.data = data;
          this.totalElements = data.totalElements;
          this.changeFilter = false;
        },
        error: (error) => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
        },
      });
  }

  /**
   * Limpa variáveis utilizadas no componente de paginação
   */
  clearPagination() {
    this.totalElements = 0;
    this.currentPage = 1;
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
        pageNumber: 0,
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
    if (this.currentPage !== event.page) {
      this.currentPage = event.page;
      this.search();
    }
  }

  /**
   * Executado sempre que for selecionado um ano diferente
   *
   * @param event any
   */
  onChangeYear(event: any): void {
    const v = event.target.value;
    const oldValue = this.year;
    this.year = (v !== '-1') ? v : undefined;
    this.changeFilter = (this.year !== oldValue);
    this.search();
  }

  /**
   * Executado sempre que for alterado o valor do campo winner
   *
   * @param event any
   */
  onChangeWinner(event: any): void {
    const v = event.target.value;
    const oldValue = this.winner;
    this.winner = (v !== '-1') ? v : undefined;
    this.changeFilter = (this.winner !== oldValue);
    this.search();
  }
}
