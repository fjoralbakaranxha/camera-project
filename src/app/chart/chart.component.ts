import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ChartCell } from '../models/ChartCell';
import { ApiService } from '../services/api.service';

// import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  constructor(private api : ApiService) { 
    this.refreshChart();
  }

  ngOnInit(): void {
  }

  refreshChart() {
    this.api.getChartData().subscribe((data) => {
      let tempLabels: string[] = [];
      let tempData: number[] = [];
      data.map((chartCell) => {
        tempLabels.push(chartCell.pixel);
        tempData.push(chartCell.total);
      });
      this.barChartData = {
        labels: tempLabels,
        datasets: [
          { data: tempData, label: 'Cameras by Resolution' },
        ]
      }
    });
  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0
      }
    },
    plugins: {
      legend: {
        display: true,
      }
    }
  };
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Cameras by Resolution' },
    ]
  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
  }
}
