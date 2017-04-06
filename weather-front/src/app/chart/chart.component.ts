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
  formattedData: Array<any> = [];

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
        type: 'area'
      },
      xAxis: {
        type : 'datetime',
        title : {
          text : ''
        }
      },
      yAxis : {
        title : {
          text : ''
        }
      },
      title: {
        text: ''
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'temperature',
        data: this.formattedData
      }]
    };
  }
  /**
   * [add description]
   * @param  {string} date        [description]
   * @param  {number} temperature [description]
   * @return {[type]}             [description]
   */
  add(date: string, temperature: number) {
    // Highcharts prefers dates in milliseconds
    let newdate = +new Date(date);
    this.formattedData.push({
        x: newdate,
        y: temperature
    });
  }

  ngOnInit() {
    this.connection = this.temperatureService.getTemperature().subscribe(
      message => {
        this.add(message.date, message.temperature);
        // this.chart.update({ series : {data : this.formattedData }});
        this.chart.series[0].setData(this.formattedData, true);
    });
  }

  ngAfterViewInit() {
		this.options.chart.renderTo = this.chartContainer.nativeElement;
    this.chart = new HighchartsBoost.Chart(this.options);
  }

}
