import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-time-sheet-time-series',
  templateUrl: './time-sheet-time-series.component.html',
  styleUrls: ['./time-sheet-time-series.component.css']
})
export class TimeSheetTimeSeriesComponent implements OnInit {
  theArray = [
    {
      id: '',
      projectname: '',
    },
  ];
  second  =[
    {
      firstname : '',
    }
  ];

  project=[];
  user=[];

  Month=[
    {month:"3 Months"},
    {month:"6 Months"},
    {month:"9 Months"},
    {month:"12 Months"},
    
];
  constructor() { }

  ngOnInit() {



    axios.get('http://localhost:3000/users').then((res)=>{
      console.log(res);
      this.second=res.data.rows;
    })
    axios.get('http://localhost:3000/projects').then((res) => {
      console.log(res);
      this.theArray = res.data.rows;
    })
  }

}
