import { TestBed } from '@angular/core/testing';

import { YearService } from './year.service';

describe('YearService', () => {
  let service: YearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should mountPreviousYears with param 1', () => {
    const currentYear = new Date().getFullYear();
    const value: number[] = service.mountPreviousYears(1);
    expect(value).toEqual([currentYear]);
  });

  it('should mountPreviousYears with param 2', () => {
    const currentYear = new Date().getFullYear();
    const value: number[] = service.mountPreviousYears(2);
    expect(value).toEqual([currentYear, currentYear - 1]);
  });

  it('should mountPreviousYears without param', () => {
    const currentYear = new Date().getFullYear();
    const value: number[] = service.mountPreviousYears();
    expect(value).toEqual([currentYear]);
  });
});
