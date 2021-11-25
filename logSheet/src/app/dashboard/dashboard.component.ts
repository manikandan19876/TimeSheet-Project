import { SelectionModel } from '@angular/cdk/collections'
import { Component, OnInit } from '@angular/core'

import axios from 'axios'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  theArray = [
    {
      id: '',
      projectname: '',
    },
  ]
GroupBy = [
  {
    groupby: "Users"
  },
  {
    groupby: "Activity"
  }
]
  constructor() {}

  ngOnInit() {
    axios.get('http://localhost:3000/projects').then((res) => {
      console.log(res)
      this.theArray = res.data
    })

  }
}



