import { SelectionModel } from '@angular/cdk/collections'
import { Component } from '@angular/core'

import axios from 'axios'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  // selectedGroup: string;
  // groupedDrop: SelectItemGroup[];
  theArray = [
    {
      id: '',
      projectname: '',
    },
  ]
  second = [];
  third: any = [];
  fistArr= new Array();


  constructor() {

    //   this.groupedDrop = [
    //   {
    //     label: 'Users',
    //     items: []
    //   },
    //   {
    //     label: 'Activity',
    //     items: []
    //   }
    // ]
  }
  ngOnInit() {
    axios.get('http://localhost:3000/users').then((res) => {
      console.log(res)
      let data = res.data.rows
      // console.log(this.second);
      this.second = data.reduce((accumalator: any, current: any) => {
        if (
          !accumalator.some((item: any) => item.firstname === current.firstname)
        ) {
          accumalator.push(current)
        }
        return accumalator
      }, [])
      // console.log(this.second)
      for (var i=0; i<this.second.length; i++){
        this.fistArr.push(this.second[i]);
        console.log(this.fistArr);
       }

    })
    axios.get('http://localhost:3000/projects').then((res) => {
      console.log(res)
      this.theArray = res.data
    })

  }
}



