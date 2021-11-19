import { Component, OnInit, ViewChild } from '@angular/core';


import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexLegend,
  ApexFill,
  ApexYAxis
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
  yaxis: ApexYAxis
};

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  @ViewChild("chart")
  chart: ChartComponent = new ChartComponent;

  public chartOptions!: Partial<ChartOptions> | any;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Training",
        data: [44,54,41,67,22]
        },

        {
          name: "Development",
        data: [34,54,51,67,22]
        },
        {
          name: "Analysis",
        data: [21,56,23,19,22]
        },
        {
          name: "Review",
        data: [40,11,25,36,49]
        }
      ],
      yaxis:{
          title: {
            text: "Effort",
            style: {
              width: "100"
            }
          }
        },

      chart: {
        type: "bar",
        height: 400,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      xaxis: {
        type: "category",

        categories: [
          "Manikandan",
          "Pasupathy",
          "Krishna",
          "Hariharan",
          "Kishore"

        ]
    },
    legend: {
      position: "top",
      horizontalAlign: 'center',
      offsetY: 20
    },
    fill: {
      opacity: 1
    }
  };
}


  ngOnInit(): void {}
}
