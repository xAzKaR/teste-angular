import { ClienteListComponent } from './../cliente/list/list.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: "", component: MovieListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
