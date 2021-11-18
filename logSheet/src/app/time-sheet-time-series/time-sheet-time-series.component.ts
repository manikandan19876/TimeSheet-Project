import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-sheet-time-series',
  templateUrl: './time-sheet-time-series.component.html',
  styleUrls: ['./time-sheet-time-series.component.css']
})
export class TimeSheetTimeSeriesComponent implements OnInit {

  project=[];
  user=[];

  Month=[
    {month:"3 Months"},
    {month:"6 Months"},
    {month:"9 Months"},
    {month:"12 Months"},
];
  constructor() { }

  ngOnInit(): void {
  }

}
