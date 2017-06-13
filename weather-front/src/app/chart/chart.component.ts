import { Component, AfterViewInit, OnDestroy, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeUntil';
import * as _ from 'lodash';
import * as HighchartsBoost from 'highcharts';
import * as Highcharts from 'highcharts';

import { TemperatureService } from './temperature.service';

interface TemperaturePoint {
  x: number;
  y: number;
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('chartContainer') public chartContainer: ElementRef;

  private ngUnsubscribe: Subject<void> = new Subject<void>();
  chart: any;
  options: any;
  currentTemperature: number;
  private temperaturePoints: TemperaturePoint[] = [];

  /**
  * Constructor
  * @param  {TemperatureService} privatetemperatureService
  */
  constructor(private temperatureService: TemperatureService) {
    const me = this;

    // TODO : it works, but the time is not displayed at the beginning
    Highcharts.setOptions({
      global : {
        timezoneOffset : new Date().getTimezoneOffset()
      }
    });

    // Subscribe to the temperature socket to get the last temperature readings
    this.temperatureService.getTemperature()
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
        this.temperaturePoints.push({
             x: newDate,
             y: message.temperature
         });

    });
  }

  public ngOnInit() {
    // Subscribe to the temperature rest service to get
    // the today temperature readings
    this.temperatureService
      .getTodayTemperatures()
      .subscribe(
        (todayTemperatures) => {
          todayTemperatures.map((temperature) => {
            this.temperaturePoints.push({
              x: +new Date(temperature.date),
              y: temperature.temperature
            });
          });
        }
      );
  }

  private setOption() {
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
        data: this.temperaturePoints
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
