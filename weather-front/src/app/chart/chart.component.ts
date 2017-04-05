import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { TemperatureService } from './temperature.service';

interface Temperature {
	temperature: number;
	date: Date;
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  connection;

  chart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Linechart'
    },
    credits: {
      enabled: false
    },
    series: [{
      name: 'Line 1',
      data: [1, 2, 3]
    }]
  });

  // add point to chart serie
  add(temperature: number) {
    this.chart.addPoint(Math.floor(Math.random() * 10));
  }

	constructor(private temperatureService: TemperatureService) {	}

  ngOnInit() {
    this.connection = this.temperatureService.getTemperature().subscribe(
      message => {
        this.add(message.temperature);
    });
  }
}
