import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { of, throwError  } from 'rxjs';

import { WinnerMultipleListComponent } from './list.component';
import { WinnerService } from '@services/winner.service';
import { WinnerYearListModel } from '@models/winner.model';
import { mockWinner } from '@mocks/winner';

describe('WinnerMultipleListComponent', () => {
  let component: WinnerMultipleListComponent;
  let fixture: ComponentFixture<WinnerMultipleListComponent>;
  let service: WinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WinnerMultipleListComponent],
      imports: [HttpClientTestingModule],
      providers: [WinnerService]
    });
    fixture = TestBed.createComponent(WinnerMultipleListComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(WinnerService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get winners from data if getAll is successfull', () => {

    const mock: WinnerYearListModel = mockWinner.filledContent;

    spyOn(component, 'clearData').and.stub();
    spyOn(service, 'getAll').and.returnValue(of(mock));

    component.getData();
    expect(component.data).toEqual(mock);
    expect(component.clearData).toHaveBeenCalled();
  });

  it('should get winners from data if getAll is not successfull', () => {
    spyOn(component, 'clearData').and.stub();
    spyOn(service, 'getAll').and.returnValue(throwError({status: 404}));
    component.getData();

    expect(component.data).toEqual(mockWinner.emptyContent);
    expect(component.clearData).toHaveBeenCalled();
  });

  it('should call clearData', () => {
    spyOn(component, 'clearData');
    component.clearData();
    expect(component.data).toEqual(mockWinner.emptyContent);
    expect(component.clearData).toHaveBeenCalled();
  });
});
