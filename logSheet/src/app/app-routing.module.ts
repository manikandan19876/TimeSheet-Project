import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimeSheetTimeSeriesComponent } from './time-sheet-time-series/time-sheet-time-series.component';


const routes: Routes = [  
  {path:'time-series', component:TimeSheetTimeSeriesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
