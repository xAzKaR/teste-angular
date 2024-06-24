import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { StudioService } from './studio.service';
import { HttpRequest } from '@angular/common/http';
import { mockStudio } from '@mocks/studio';
import { StudioListModel } from '../models/studio.model';
import { of } from 'rxjs';

describe('StudioService', () => {
  let service: StudioService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(StudioService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("Should call http.get getAll method with the expected url", (done) => {
    service.getAll().subscribe(() => done());

    httpController.expectOne((req: HttpRequest<any>) => {
         expect(req.url).toBe(service.uri + '/movies?projection=studios-with-win-count');
         expect(req.method).toBe('GET');
         expect(req.urlWithParams).toEqual(service.uri + '/movies?projection=studios-with-win-count');

        return true;
      })
      .flush(mockStudio.filledContent);
  });

  it('should get studios from data if getAll is successfull', () => {
    const mock: StudioListModel = mockStudio.filledContent;

    spyOn(service, 'getAll').and.returnValue(of(mock));
    let data: StudioListModel = mockStudio.emptyContent;
    service.getAll().subscribe({
      next: (value: any) => {
        data = value;
      }
    });
    expect(data).toEqual(mockStudio.filledContent);
  });
});
