import { Component, AfterContentInit, OnInit } from '@angular/core'
import * as ApexCharts from 'apexcharts'
import axios from 'axios'

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements AfterContentInit {

  constructor() {}
  activityNam = new Array()
  renderChart(x: string[], y: string[], z: string[], d: string[]) {
    var options = {
      chart: {
        type: 'bar',
        height: 500,
        stacked: true,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      },
      dataLabels: {
        enabled: false

      },
      series: [

        {
          name: 'Project-EFG',
          data: y,
        },
        {
          name: 'Project-Bestomech',
          data: z,
        },
        {
          name: 'Merchandizing-EFG',
          data: d,
        },
      ],
      xaxis: {
        type: 'category',
        categories: x,
        style: {
          fontSize: '12px',
        },
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return val + 'hr'
          },
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center',
        offsetY: 20,
      },
      fill: {
        opacity: 1,
      },
    }
    var chart = new ApexCharts(document.querySelector('#chart'), options)
    chart.render()
  }
  ngAfterContentInit(): void {
    axios({
      method: 'GET',
      url:
        'http://localhost:3000/usertimesheet?from_dt=2021-09-25&to_dt=2021-10-13',
    }).then((response) => {
      console.log('USER TIMESHEET >>>>', response.data)
      const activityName = response.data.map(function (usrName: any) {
        return `${usrName.activityname} `
      })
      let uniqueActivity = [...new Set(activityName)]
      console.log(uniqueActivity)
      const fullName = response.data.map(function (userName: any) {
        return `${userName.sum}`
      })
      var b = fullName.splice(0, 9)
      var c = fullName.splice(0, 9)
      var d = fullName.splice(0, 9)
      console.log(d)
      var e = new Array()
      const n = 9
      const result = new Array(Math.ceil(fullName.length / n))
        .fill(e)
        .map((_) => fullName.splice(0, n))
      console.log(result)
      console.log(fullName)
      this.renderChart(
        uniqueActivity as string[],
        b as string[],
        c as string[],
        d as string[],
      )
    })
  }
  ngOnInit() {}
}
