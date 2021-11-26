import { Component, OnInit, AfterContentInit, ViewChild } from '@angular/core';
import axios from 'axios';
import * as ApexCharts from 'apexcharts';
import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStates,
  ApexGrid,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { arrayData } from "./data-series";
import { __values } from 'tslib';

type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

var colors = [
  "#008FFB",
  "#00E396",
  "#FEB019",
  "#FF4560",
  "#775DD0",
  "#00D9E9",
  "#FF66C3"
];

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  subtitle: ApexTitleSubtitle;
  colors: string[];
  states: ApexStates;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  tooltip: any; //ApexTooltip;
};

window.Apex = {
  chart: {
    toolbar: {
      show: false
    }
  },
  tooltip: {
    shared: false
  },
  legend: {
    show: false
  }
};


declare global {
  interface Window {
    Apex: any;
  }
}

@Component({
  selector: 'app-time-sheet-time-series',
  templateUrl: './time-sheet-time-series.component.html',
  styleUrls: ['./time-sheet-time-series.component.css']
})
export class TimeSheetTimeSeriesComponent implements OnInit, AfterContentInit {

  userDrop: boolean = false;
  proDrop: boolean = false;

  pro_id:number = 0;

  user_id:number = 0;

  project: any = [];

  user: any = [];

  timSeries: any = [];

  Month = [

    { month: "3 Months" },
    { month: "6 Months" },
    { month: "9 Months" },
    { month: "12 Months" },

  ];

  @ViewChild("chart")
  chart: ChartComponent = new ChartComponent;
  public chartOptions!: Partial<ChartOptions> | any;
  public chartQuarterOptions!: Partial<ChartOptions> | any;
  constructor() { 

    this.chartOptions = {
      series: [
        {
          name: "year",
          data: this.makeData()
        }
      ],
      chart: {
        id: "barYear",
        height: 400,
        width: "100%",
        type: "bar",
        events: {
          dataPointSelection: (e:any, chart:any, opts:any) => {
            var quarterChartEl = document.querySelector("#chart-quarter") as HTMLElement;
            var yearChartEl = document.querySelector("#chart-year") as HTMLElement;

            if (opts.selectedDataPoints[0].length === 1) {
              if (quarterChartEl.classList.contains("active")) {
                this.updateQuarterChart(chart, "barQuarter");
              } else {
                yearChartEl.classList.add("chart-quarter-activated");
                quarterChartEl.classList.add("active");
                this.updateQuarterChart(chart, "barQuarter");
              }
            } else {
              this.updateQuarterChart(chart, "barQuarter");
            }

            if (opts.selectedDataPoints[0].length === 0) {
              yearChartEl.classList.remove("chart-quarter-activated");
              quarterChartEl.classList.remove("active");
            }
          },
          updated: (chart:any) => {
            this.updateQuarterChart(chart, "barQuarter");
          }
        }
      },
      plotOptions: {
        bar: {
          distributed: true,
          horizontal: true,
          barHeight: "75%",
          dataLabels: {
            position: "bottom"
          }
        }
      },
      dataLabels: {
        enabled: true,
        textAnchor: "start",
        style: {
          colors: ["#fff"]
        },
        formatter: function(val:any, opt:any) {
          return opt.w.globals.labels[opt.dataPointIndex];
        },
        offsetX: 0,
        dropShadow: {
          enabled: true
        }
      },

      colors: colors,

      states: {
        normal: {
          filter: {
            type: "desaturate"
          }
        },
        active: {
          allowMultipleDataPointsSelection: true,
          filter: {
            type: "darken",
            value: 1
          }
        }
      },
      tooltip: {
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function(val: any, opts:any) {
              return opts.w.globals.labels[opts.dataPointIndex];
            }
          }
        }
      },
      title: {
        text: "Yearly Results",
        offsetX: 15
      },
      subtitle: {
        text: "(Click on bar to see details)",
        offsetX: 15
      },
      yaxis: {
        labels: {
          show: false
        }
      }
    };

    this.chartQuarterOptions = {
      series: [
        {
          name: "quarter",
          data: []
        }
      ],
      chart: {
        id: "barQuarter",
        height: 400,
        width: "100%",
        type: "bar",
        stacked: true
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
          horizontal: false
        }
      },
      legend: {
        show: false
      },
      grid: {
        yaxis: {
          lines: {
            show: false
          }
        },
        xaxis: {
          lines: {
            show: true
          }
        }
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      title: {
        text: "Quarterly Results",
        offsetX: 10
      },
      tooltip: {
        x: {
          formatter: function(val: any, opts: any) {
            return opts.w.globals.seriesNames[opts.seriesIndex];
          }
        },
        y: {
          title: {
            formatter: function(val: any, opts: any) {
              return opts.w.globals.labels[opts.dataPointIndex];
            }
          }
        }
      }
    };

  }

  public makeData(): any {
    var dataSet = this.shuffleArray(arrayData);

    var dataYearSeries = [
      {
        x: "2011",
        y: dataSet[0].y,
        color: colors[0],
        quarters: dataSet[0].quarters
      },
      {
        x: "2012",
        y: dataSet[1].y,
        color: colors[1],
        quarters: dataSet[1].quarters
      },
      {
        x: "2013",
        y: dataSet[2].y,
        color: colors[2],
        quarters: dataSet[2].quarters
      },
      {
        x: "2014",
        y: dataSet[3].y,
        color: colors[3],
        quarters: dataSet[3].quarters
      },
      {
        x: "2015",
        y: dataSet[4].y,
        color: colors[4],
        quarters: dataSet[4].quarters
      },
      {
        x: "2016",
        y: dataSet[5].y,
        color: colors[5],
        quarters: dataSet[5].quarters
      }
    ];

    return dataYearSeries;
  }


  public shuffleArray(array: any) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  public updateQuarterChart(sourceChart: any, destChartIDToUpdate: any) {
    var series = [];
    var seriesIndex = 0;
    var colors = [];

    if (sourceChart.w.globals.selectedDataPoints[0]) {
      var selectedPoints = sourceChart.w.globals.selectedDataPoints;
      for (var i = 0; i < selectedPoints[seriesIndex].length; i++) {
        var selectedIndex = selectedPoints[seriesIndex][i];
        var yearSeries = sourceChart.w.config.series[seriesIndex];
        series.push({
          name: yearSeries.data[selectedIndex].x,
          data: yearSeries.data[selectedIndex].quarters
        });
        colors.push(yearSeries.data[selectedIndex].color);
      }

      if (series.length === 0)
        series = [
          {
            data: []
          }
        ];

      return window.ApexCharts.exec(destChartIDToUpdate, "updateOptions", {
        series: series,
        colors: colors,
        fill: {
          colors: colors
        }
      });
    }
  }

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

  }


  proId(proVal:any){

        let val = this.project.find((obj: any) => {

            return obj.projectname === proVal.value;
          });
        this.pro_id = val.id
        console.log(this.pro_id);
     
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
