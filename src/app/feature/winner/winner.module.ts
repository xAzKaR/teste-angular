import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { WinnerRoutingModule } from './winner-routing.module';
import { WinnerMovieListComponent } from './movie/list.component';
import { WinnerMultipleListComponent } from './multiple/list.component';
import { WinnerStudioListComponent } from './studio/list.component';
import { WinnerProducerListComponent } from './producer/list.component';
import { WinnerClientListComponent } from './cliente/list/list.component';

@NgModule({
  declarations: [
    WinnerMultipleListComponent,
    WinnerStudioListComponent,
    WinnerProducerListComponent,
    WinnerMovieListComponent,
    WinnerClientListComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    WinnerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    WinnerMultipleListComponent,
    WinnerStudioListComponent,
    WinnerProducerListComponent,
    WinnerMovieListComponent,
    WinnerClientListComponent
  ]
})
export class WinnerModule { }
