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
  constructor() {

    // var objActivity = {"ActivityID ": "3", "fromDate": 2021-09-25, "toDate": 2021-10-13, "projectID": 33}
    // console.log(objActivity);

    // var objUser= {"fromDate": 2021-09-25, "toDate": 2021-10-13, "UserID": 76 }
    // console.log(objUser);
  }

  ngOnInit() {
    axios.get('http://localhost:3000/projects').then((res) => {
      console.log(res)
      this.theArray = res.data
    })
  }
}



