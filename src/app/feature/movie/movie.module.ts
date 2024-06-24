
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MovieRoutingModule } from './movie-routing.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { MovieListComponent } from './list/list.component';

@NgModule({
  declarations: [
    MovieListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MovieRoutingModule,
    PaginationModule.forRoot()
  ],
  exports: [
    MovieListComponent
  ]
})
export class MovieModule { }
