import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProducerService } from './producer.service';
import { HttpRequest } from '@angular/common/http';
import { mockProducerMaxMinInterval } from '@mocks/producer';
import { of } from 'rxjs';
import { ProducerMaxMinIntervalModel } from '../models/producer.model';

describe('ProducerService', () => {
  let service: ProducerService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ProducerService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("Should call http.get getPrizeRange method with the expected url", (done) => {
    service.getPrizeRange().subscribe(() => done());

    httpController.expectOne((req: HttpRequest<any>) => {
         expect(req.url).toBe(service.uri + '/movies?projection=max-min-win-interval-for-producers');
         expect(req.method).toBe('GET');
         expect(req.urlWithParams).toEqual(service.uri + '/movies?projection=max-min-win-interval-for-producers');

        return true;
      })
      .flush(mockProducerMaxMinInterval.filledContent);
  });

  it('should get studios from data if getPrizeRange is successfull', () => {
    const mock: ProducerMaxMinIntervalModel = mockProducerMaxMinInterval.filledContent;

    spyOn(service, 'getPrizeRange').and.returnValue(of(mock));
    let data: ProducerMaxMinIntervalModel = mockProducerMaxMinInterval.emptyContent;
    service.getPrizeRange().subscribe({
      next: (value: any) => {
        data = value;
      }
    });
    expect(data).toEqual(mockProducerMaxMinInterval.filledContent);
  });
});
