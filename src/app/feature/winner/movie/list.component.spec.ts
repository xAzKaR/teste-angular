import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { of, throwError  } from 'rxjs';

import { mopckMovie } from '@mocks/movie';
import { WinnerMovieListComponent } from './list.component';
import { MovieService } from '@services/movie.service';
import { MovieModel } from '@models/movie.model';
import { By } from '@angular/platform-browser';

describe('WinnerMovieListComponent', () => {
  let component: WinnerMovieListComponent;
  let fixture: ComponentFixture<WinnerMovieListComponent>;
  let service: MovieService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ WinnerMovieListComponent ],
      providers: [MovieService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WinnerMovieListComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [MovieService]
    });
    fixture = TestBed.createComponent(WinnerMovieListComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(MovieService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get winners from data if getAll is successfull', () => {

    const mock: MovieModel[] = mopckMovie.filledContent;

    const inEl = fixture.debugElement.query(By.css('select'));
    inEl.nativeElement.value = 2018
    inEl.nativeElement.dispatchEvent(new Event('change'));

    spyOn(component, 'clearData').and.stub();
    spyOn(service, 'getAll').and.returnValue(of(mock));
    component.search();

    expect(component.form.value.year).toBe('2018');
    expect(component.data).toEqual(mock);
    expect(component.clearData).toHaveBeenCalled();
  });

  it('should get winners from data if getAll is not successfull', () => {
    const mock: MovieModel[] = mopckMovie.emptyContent;

    const inEl = fixture.debugElement.query(By.css('select'));
    inEl.nativeElement.value = 2018
    inEl.nativeElement.dispatchEvent(new Event('change'));

    spyOn(component, 'clearData').and.stub();
    spyOn(service, 'getAll').and.returnValue(throwError({status: 404}));
    component.search();

    expect(component.form.value.year).toBe('2018');
    expect(component.data).toEqual(mock);
    expect(component.clearData).toHaveBeenCalled();
  });

  it('should get winners from data if form is not filled', () => {
    const mock: MovieModel[] = mopckMovie.emptyContent;

    spyOn(component, 'clearData').and.stub();
    component.search();

    expect(component.form.value.year).toBe(null);
    expect(component.data).toEqual(mock);
    expect(component.clearData).toHaveBeenCalled();
  });

  it('should call clearData', () => {
    spyOn(component, 'clearData').and.stub();
    component.clearData();
    expect(component.data).toEqual(mopckMovie.emptyContent);
    expect(component.clearData).toHaveBeenCalled();
  });
});
