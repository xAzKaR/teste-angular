import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { of, throwError  } from 'rxjs';

import { mockProducerMaxMinInterval } from '@mocks/producer';
import { WinnerProducerListComponent } from './list.component';
import { ProducerService } from '@services/producer.service';
import { ProducerMaxMinIntervalModel } from '@app/shared/models/producer.model';

describe('WinnerProducerListComponent', () => {
  let component: WinnerProducerListComponent;
  let fixture: ComponentFixture<WinnerProducerListComponent>;
  let service: ProducerService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [WinnerProducerListComponent],
      imports: [HttpClientTestingModule],
      providers: [ProducerService]
    });
    fixture = TestBed.createComponent(WinnerProducerListComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(ProducerService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get producers from data if getPrizeRange is successfull', () => {

    const mock: ProducerMaxMinIntervalModel = mockProducerMaxMinInterval.filledContent;

    spyOn(component, 'clearData').and.stub();
    spyOn(service, 'getPrizeRange').and.returnValue(of(mock));

    component.getData();
    expect(component.data).toEqual(mock);
    expect(component.clearData).toHaveBeenCalled();
  });

  it('should get producers from data if getPrizeRange is not successfull', () => {
    spyOn(component, 'clearData').and.stub();
    spyOn(service, 'getPrizeRange').and.returnValue(throwError({status: 404}));
    component.getData();

    expect(component.data).toEqual(mockProducerMaxMinInterval.emptyContent);
    expect(component.clearData).toHaveBeenCalled();
  });

  it('should call clearData', () => {
    spyOn(component, 'clearData');
    component.clearData();
    expect(component.data).toEqual(mockProducerMaxMinInterval.emptyContent);
    expect(component.clearData).toHaveBeenCalled();
  });
});
