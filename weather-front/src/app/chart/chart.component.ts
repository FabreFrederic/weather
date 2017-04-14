import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as _ from 'lodash';
import * as HighchartsBoost from 'highcharts';
import { TemperatureService } from './temperature.service';

interface Temperature {
	temperature: number;
	date: string;
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit {
  @ViewChild('chartContainer') private chartContainer: ElementRef;
  connection;
  chart: any;
  options: any;
  temperatures: Array<any> = [];
  currentTemperature: number;

	constructor(private temperatureService: TemperatureService) {
    // Set the timezone offset on the computer timezone offset
    HighchartsBoost.setOptions({
      global : {
        timezoneOffset : new Date().getTimezoneOffset()
      }
    });
    this.setOption();
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
        name: 'temperature',
        data: this.temperatures
      }]
    };
  }
  
  /**
   * [add description]
   * @param  {string} date        [description]
   * @param  {number} temperature [description]
   * @return {[type]}             [description]
   */
  addPoint(date: string, temperature: number) {
    // Highcharts prefers dates in milliseconds
    let newdate = +new Date(date);
    this.temperatures.push({
        x: newdate,
        y: temperature
    });
  }

  ngOnInit() {
    this.connection = this.temperatureService.getTemperature().subscribe(
      message => {
        this.addPoint(message.date, message.temperature);
        this.chart.update({ series : {data : this.temperatures }});
        this.currentTemperature = message.temperature;
    });
  }

  ngAfterViewInit() {
		this.options.chart.renderTo = this.chartContainer.nativeElement;
    this.chart = new HighchartsBoost.Chart(this.options);
  }

}
