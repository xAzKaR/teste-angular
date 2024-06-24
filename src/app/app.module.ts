import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { SidebarComponent } from '@core/sidebar/sidebar.component';
import { NavbarComponent } from '@core/navbar/navbar.component';
import { DashboardComponent } from './feature/dashboard/dashboard.component';

import { WinnerModule } from './feature/winner/winner.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    PaginationModule.forRoot(),
    AppRoutingModule,
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    WinnerModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
