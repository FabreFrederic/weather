import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as _ from 'lodash';
import * as HighchartsBoost from 'highcharts';
import * as Highcharts from 'highcharts';

import { TemperatureService } from './temperature.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit {
  @ViewChild('chartContainer') public chartContainer: ElementRef;
  connection;
  chart: any;
  options: any;
  currentTemperature: number;

	constructor(private temperatureService: TemperatureService) {
    const me = this;

    // TODO : it works, but the time is not displayed at the beginning
    // HighchartsBoost.setOptions({
    //   global : {
    //     timezoneOffset : new Date().getTimezoneOffset()
    //   }
    // });

    this.connection = this.temperatureService.getTemperature().subscribe(
      message => {
          if (me.chart) {
            me.chart.series[0].addPoint([+new Date(message.date),
              message.temperature], true, false);
          }
        me.currentTemperature = message.temperature;
    });
  }

  setOption() {
    this.options = {
      chart: {
        type: 'spline',
        marginRight: 10
      },
      title: {
        text: 'Aujourd\'hui'
      },
      xAxis: {
        type : 'datetime'
      },
      yAxis : {
        title : {
          text : 'Temperature C°'
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'temperature'
      }]
    };
  }

  ngAfterViewInit() {
    this.setOption();
    if (this.chartContainer && this.chartContainer.nativeElement) {
      this.options.chart = {
          type: 'spline',
          renderTo: this.chartContainer.nativeElement
      };
      this.chart = new Highcharts.Chart(this.options);
    }
  }
}
