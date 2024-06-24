import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { of, throwError  } from 'rxjs';

import { mockStudio } from '@mocks/studio';
import { WinnerStudioListComponent } from './list.component';
import { StudioService } from '@services/studio.service';
import { StudioListModel } from '@models/studio.model';

describe('WinnerStudioListComponent', () => {
  let component: WinnerStudioListComponent;
  let fixture: ComponentFixture<WinnerStudioListComponent>;
  let service: StudioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WinnerStudioListComponent],
      imports: [HttpClientTestingModule],
      providers: [StudioService]
    });
    fixture = TestBed.createComponent(WinnerStudioListComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(StudioService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get studios from data if getAll is successfull', () => {

    const mock: StudioListModel = mockStudio.filledContent;

    spyOn(component, 'clearData').and.stub();
    spyOn(service, 'getAll').and.returnValue(of(mock));

    component.getData();
    expect(component.data).toEqual(mock);
    expect(component.clearData).toHaveBeenCalled();
  });

  it('should get studios from data if getAll is not successfull', () => {
    spyOn(component, 'clearData').and.stub();
    spyOn(service, 'getAll').and.returnValue(throwError({status: 404}));
    component.getData();

    expect(component.data).toEqual(mockStudio.emptyContent);
    expect(component.clearData).toHaveBeenCalled();
  });

  it('should call clearData', () => {
    spyOn(component, 'clearData');
    component.clearData();
    expect(component.data).toEqual(mockStudio.emptyContent);
    expect(component.clearData).toHaveBeenCalled();
  });
});
