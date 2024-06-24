import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { WinnerService } from './winner.service';
import { HttpRequest } from '@angular/common/http';
import { of } from 'rxjs';
import { mockWinner } from '@mocks/winner';
import { WinnerYearListModel } from '../models/winner.model';

describe('WinnerService', () => {
  let service: WinnerService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(WinnerService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("Should call http.get getAll method with the expected url", (done) => {
    service.getAll().subscribe(() => done());

    httpController.expectOne((req: HttpRequest<any>) => {
         expect(req.url).toBe(service.uri + '/movies?projection=years-with-multiple-winners');
         expect(req.method).toBe('GET');
         expect(req.urlWithParams).toEqual(service.uri + '/movies?projection=years-with-multiple-winners');

        return true;
      })
      .flush(mockWinner.filledContent);
  });

  it('should get studios from data if getAll is successfull', () => {
    const mock: WinnerYearListModel = mockWinner.filledContent;

    spyOn(service, 'getAll').and.returnValue(of(mock));
    let data: WinnerYearListModel = mockWinner.emptyContent;
    service.getAll().subscribe({
      next: (value: any) => {
        data = value;
      }
    });
    expect(data).toEqual(mockWinner.filledContent);
  });
});
