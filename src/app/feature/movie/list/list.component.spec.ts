import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { of, throwError  } from 'rxjs';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { mockMoviePagination } from '@mocks/movie';
import { MovieListComponent } from './list.component';
import { MovieService } from '@services/movie.service';
import { YearService } from '@services/year.service';
import { PaginationMovieModel } from '@models/pagination-movie.model';


describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let service: MovieService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ MovieListComponent ],
      providers: [MovieService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieListComponent]
    });
    TestBed.configureTestingModule({
      declarations: [MovieListComponent],
      imports: [HttpClientTestingModule, PaginationModule],
      providers: [MovieService, YearService]
    });

    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(MovieService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get movies from data if getAllPaging is successfull', () => {

    const mock: PaginationMovieModel = mockMoviePagination.filledContent;

    spyOn(component, 'clearData').and.stub();
    spyOn(service, 'getAllPaging').and.returnValue(of(mock));

    component.search();
    expect(component.data).toEqual(mock);
    expect(component.clearData).toHaveBeenCalled();
  });

  it('should get movies from data if getAllPaging is not successfull', () => {
    spyOn(component, 'clearData').and.stub();
    spyOn(service, 'getAllPaging').and.returnValue(throwError({status: 404}));
    component.search();

    expect(component.data).toEqual(mockMoviePagination.emptyContent);
    expect(component.clearData).toHaveBeenCalled();
  });

  it('should call clearData', () => {
    spyOn(component, 'clearData');
    component.clearData();
    expect(component.data).toEqual(mockMoviePagination.emptyContent);
    expect(component.clearData).toHaveBeenCalled();
  });

  it('should call onPageChange', () => {
    const event = {
      itemsPerPage: 15,
      page: 1
    }
    spyOn(component, 'search');
    component.onPageChange(event);

    expect(component.currentPage).toEqual(1);
    expect(component.search).toHaveBeenCalled();
  });

  it('should call onChangeYear', () => {
    const event = {
      target: {
        value: 2018
      }
    }
    spyOn(component, 'search');
    component.onChangeYear(event);

    expect(component.year).toEqual(2018);
    expect(component.search).toHaveBeenCalled();
  });

  it('should call onChangeWinner', () => {
    const event = {
      target: {
        value: true
      }
    }
    spyOn(component, 'search');
    component.onChangeWinner(event);

    expect(component.winner).toEqual(true);
    expect(component.search).toHaveBeenCalled();
  });
});
