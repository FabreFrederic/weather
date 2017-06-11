import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import * as _ from 'lodash';
import * as HighchartsBoost from 'highcharts';
import * as Highcharts from 'highcharts';

import { TemperatureService } from './temperature.service';

interface Temperature {
  x: number;
  y: number;
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chartContainer') public chartContainer: ElementRef;
  connection;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  chart: any;
  options: any;
  currentTemperature: number;
  temperatures: Array<Temperature> = [];

  constructor(private temperatureService: TemperatureService) {
    const me = this;

    // TODO : it works, but the time is not displayed at the beginning
    Highcharts.setOptions({
      global : {
        timezoneOffset : new Date().getTimezoneOffset()
      }
    });

    this.connection = this.temperatureService.getTemperature()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
      message => {
        const newDate: number = +new Date(message.date);

        if (me.chart) {
          me.chart.series[0].addPoint([newDate,
            message.temperature], true, false);
        }
        me.currentTemperature = message.temperature;
        // Historic values
        this.temperatures.push({
             x: newDate,
             y: message.temperature
         });

    });

    // TODO : get historic values from server
    //
  }

  setOption() {
    this.options = {
      chart: {
        type: 'area',
        marginRight: 10
      },
      title: {
        text: 'Aujourd\'hui'
      },
      xAxis: {
        type: 'datetime'
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

  ngAfterViewInit() {
    this.setOption();
    if (this.chartContainer && this.chartContainer.nativeElement) {
      this.options.chart = {
          renderTo: this.chartContainer.nativeElement
      };
      this.chart = new Highcharts.Chart(this.options);
    }
  }

  private unsubscribe() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnDestroy() {
    console.log('On destroy : unsubscribed from socket');
    this.unsubscribe();
  }

  @HostListener('window:beforeunload')
  onBeforeUnload() {
    console.log('Before unload : unsubscribed from socket');
    this.unsubscribe();
  }
}
