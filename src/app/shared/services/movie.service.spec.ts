import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MovieService } from './movie.service';
import { mopckMovie } from '@mocks/movie';
import { MovieModel } from '../models/movie.model';
import { of } from 'rxjs';
import { HttpRequest } from '@angular/common/http';

describe('MovieService', () => {
  let service: MovieService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(MovieService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get winners from data if getAll is successfull with content', () => {

    const mock: MovieModel[] = mopckMovie.filledContent;

    spyOn(service, 'getAll').and.returnValue(of(mock));
    let data: MovieModel[] = mopckMovie.emptyContent;
    service.getAll(2018).subscribe({
      next: (value: any) => {
        data = value;
      }
    });

    expect(data).toEqual(mopckMovie.filledContent);
  });

  it('should get winners from data if getAll is successfull without content', () => {

    const mock: MovieModel[] = mopckMovie.emptyContent;

    spyOn(service, 'getAll').and.returnValue(of(mock));
    let data: MovieModel[] = mopckMovie.filledContent;
    service.getAll(2018).subscribe({
      next: (value: any) => {
        data = value;
      }
    });

    expect(data).toEqual(mopckMovie.emptyContent);
  });

  it("Should call http.get getAll method with the expected url and params year 2018 and winner true", (done) => {
    service.getAll(2018).subscribe(() => done());

    httpController.expectOne((req: HttpRequest<any>) => {
         expect(req.url).toBe(service.uri);
         expect(req.method).toBe('GET');
         expect(req.urlWithParams).toEqual(service.uri + '?year=2018&winner=true');

        return true;
      })
      .flush(mopckMovie.filledContent);
  });

  it("Should call http.get getAll method with the expected url and params year 2019 and winner false", (done) => {
    service.getAll(2019, false).subscribe(() => done());

    httpController.expectOne((req: HttpRequest<any>) => {
         expect(req.url).toBe(service.uri);
         expect(req.method).toBe('GET');
         expect(req.urlWithParams).toEqual(service.uri + '?year=2019&winner=false');

        return true;
      })
      .flush(mopckMovie.filledContent);
  });

  it("Should call http.get getAllPaging method with the expected url and params page 9 and size 15", (done) => {
    service.getAllPaging(9, 15).subscribe(() => done());

    httpController.expectOne((req: HttpRequest<any>) => {
         expect(req.url).toBe(service.uri);
         expect(req.method).toBe('GET');
         expect(req.urlWithParams).toEqual(service.uri + '?page=9&size=15');

        return true;
      })
      .flush(mopckMovie.filledContent);
  });

  it("Should call http.get getAllPaging method with the expected url and params page 9, size 15, year 2018, winner true", (done) => {
    service.getAllPaging(9, 15, 2018, true).subscribe(() => done());

    httpController.expectOne((req: HttpRequest<any>) => {
         expect(req.url).toBe(service.uri);
         expect(req.method).toBe('GET');
         expect(req.urlWithParams).toEqual(service.uri + '?page=9&size=15&year=2018&winner=true');

        return true;
      })
      .flush(mopckMovie.filledContent);
  });

  it("Should call http.get getAllPaging method with the expected url and params page 9, size 15, year 2018", (done) => {
    service.getAllPaging(9, 15, 2019).subscribe(() => done());

    httpController.expectOne((req: HttpRequest<any>) => {
         expect(req.url).toBe(service.uri);
         expect(req.method).toBe('GET');
         expect(req.urlWithParams).toEqual(service.uri + '?page=9&size=15&year=2019');

        return true;
      })
      .flush(mopckMovie.filledContent);
  });

  it("Should call http.get getAllPaging method with the expected url and params page 9, size 15, winner false", (done) => {
    service.getAllPaging(9, 15, undefined, false).subscribe(() => done());

    httpController.expectOne((req: HttpRequest<any>) => {
         expect(req.url).toBe(service.uri);
         expect(req.method).toBe('GET');
         expect(req.urlWithParams).toEqual(service.uri + '?page=9&size=15&winner=false');

        return true;
      })
      .flush(mopckMovie.filledContent);
  });
});
