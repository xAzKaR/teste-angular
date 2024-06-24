import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './feature/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'list',
    loadChildren: () =>
        import('./feature/movie/movie.module').then(m => m.MovieModule)
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [
      RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
