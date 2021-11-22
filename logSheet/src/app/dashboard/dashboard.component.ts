import { Component } from '@angular/core';

import axios from 'axios';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
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

  constructor() {}

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
