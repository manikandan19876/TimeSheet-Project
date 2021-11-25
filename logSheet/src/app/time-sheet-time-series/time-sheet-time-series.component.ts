import { Component, OnInit, AfterContentInit } from '@angular/core';
import axios from 'axios';
import * as ApexCharts from 'apexcharts'


@Component({
  selector: 'app-time-sheet-time-series',
  templateUrl: './time-sheet-time-series.component.html',
  styleUrls: ['./time-sheet-time-series.component.css']
})
export class TimeSheetTimeSeriesComponent implements OnInit, AfterContentInit {

  userDrop: boolean = false;
  proDrop: boolean = false;

  userValue: string = "";
  proValue: string = "";
  monthWise: string = "";


  project: any = [];

  user: any = [];

  timSeries: any = [];

  Month = [

    { month: "3 Months" },
    { month: "6 Months" },
    { month: "9 Months" },
    { month: "12 Months" },

  ];
  constructor() { }

  ngOnInit() {

    axios.get('http://localhost:3001/users').then((res) => {
      console.log(res);
      let userdata: any = res.data.rows;
      console.log("User Array", userdata);

      this.user = userdata.reduce((accumalator: any, current: any) => {
        if (!accumalator.some((item: any) => item.firstname === current.firstname)) {
          accumalator.push(current);
        }
        return accumalator;
      }, []);

      console.log(this.user)
    });

    axios.get('http://localhost:3001/projects').then((res) => {
      console.log(res);
      this.project = res.data.rows;
      console.log("Project Array", this.project);

    });

  }


  ngAfterContentInit() {

    var options = {
      chart: {
        type: 'bar'
      },
      series: [{
        name: 'Manikandan',
        data: [30, 43, 56,45]
      },
      {
        name: 'Krishnakumar',
        data: [23, 40, 77,67]
      },
      {
        name: 'Hariharan',
        data: [30, 90, 35,23]
      },
      {
        name: 'Pasupathi',
        data: [30, 44, 35,55]
      },
      ],
      dataLabels: {
        enabled: false,        
        },
      xaxis: {
        title: {
          text: "User/Projects"
        },
        categories: [ "Month 1","Month 2","Month 3","Month 4"],
      }
    }

    var chart = new ApexCharts(document.querySelector("#chart"), options);

    chart.render();
  }

  monthSelected(isSelection: any) {

    var today = new Date().toISOString().slice(0, 10);
    console.log(today);
    /*today
    console.log(today);*/
    if (!null) {
      console.log("Selected Month is", isSelection.value);
      if (isSelection.value.month == "3 Months") {
        var threeMonth: any = new Date(today)
        threeMonth.setMonth(threeMonth.getMonth() - 3);
        console.log("three months before :", threeMonth.toLocaleDateString())
        let from_date = threeMonth.toISOString().slice(0, 10);

        axios.get(`http://localhost:3001/timeseries?project-id=5&from_dt=${from_date}&to_dt=${today}`).then((res) => {
          console.log(res.data.rows);
          /*this.project = res.data.rows;
          console.log("Project Array", this.project);*/
        });
      }
      else if (isSelection.value.month == "6 Months") {
          var sixMonth: any = new Date(today);
          sixMonth.setMonth(sixMonth.getMonth() - 6)
          console.log("six months before :", sixMonth.toLocaleDateString())
          let from_date = sixMonth.toISOString().slice(0, 10);
          
          axios.get(`http://localhost:3001/timeseries?project-id=5&from_dt=${from_date}&to_dt=${today}`).then((res) => {
          console.log(res.data.rows);
          /*this.project = res.data.rows;
          console.log("Project Array", this.project);*/
        });
        }
        else if (isSelection.value.month == "9 Months") {
          let nineMonth: any = new Date(today);
          nineMonth.setMonth(nineMonth.getMonth() - 9)
          console.log("nine months before :", nineMonth.toLocaleDateString())
          let from_date = nineMonth.toISOString().slice(0, 10);

          axios.get(`http://localhost:3001/timeseries?project-id=5&from_dt=${from_date}&to_dt=${today}`).then((res) => {
          console.log(res.data.rows);
          /*this.project = res.data.rows;
          console.log("Project Array", this.project);*/
        });
        }
        else if (isSelection.value.month == "12 Months") {
          let twelveMonth: any = new Date(today);
          twelveMonth.setMonth(twelveMonth.getMonth() - 12)
          console.log("twelve months before :", twelveMonth.toLocaleDateString())
          let from_date = twelveMonth.toISOString().slice(0, 10);

          axios.get(`http://localhost:3001/timeseries?project-id=5&from_dt=${from_date}&to_dt=${today}`).then((res) => {
          console.log(res.data.rows);
          /*this.project = res.data.rows;
          console.log("Project Array", this.project);*/
        });
        }
      }
      else {
        console.log("Please select month..");
      }
      return;
    }

  }
