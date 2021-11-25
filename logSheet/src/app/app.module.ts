import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {InputTextModule} from 'primeng-lts/inputtext';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TimeSheetTimeSeriesComponent } from './time-sheet-time-series/time-sheet-time-series.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {DropdownModule} from 'primeng-lts/dropdown';
import { NavBarComponent } from './nav-bar/nav-bar.component'
import {CalendarModule} from 'primeng-lts/calendar';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import {TabMenuModule} from 'primeng-lts/tabmenu';
import { ChartsComponent } from './charts/charts.component';
import { TablesComponent } from './tables/tables.component';





@NgModule({
  declarations: [
    AppComponent,
    TimeSheetTimeSeriesComponent,
    NavBarComponent,
    DashboardComponent,
    ChartsComponent,
    TablesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    BrowserAnimationsModule,
    DropdownModule,
    CalendarModule,
    TabMenuModule,
    NgApexchartsModule,
    


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
