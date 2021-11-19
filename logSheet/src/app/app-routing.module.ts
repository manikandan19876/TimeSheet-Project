import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimeSheetTimeSeriesComponent } from './time-sheet-time-series/time-sheet-time-series.component';
import { DashboardComponent } from "./dashboard/dashboard.component";




const routes: Routes = [
  {path: '',
  redirectTo:'home',
  pathMatch: 'full'
},

{
  path: 'home',
  component: DashboardComponent,
},

  {path:'time-series',
  component:TimeSheetTimeSeriesComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
