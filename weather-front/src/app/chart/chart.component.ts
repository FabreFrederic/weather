declare const require: any;
import { Component, AfterViewInit, OnDestroy, OnInit, ViewChild, ElementRef,
  HostListener, OnChanges, SimpleChange, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeUntil';
import * as _ from 'lodash';

let Highcharts = require('highcharts/highstock');

import { TemperatureService } from '../temperature/temperature.service';

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
  @Input() currentTemperature: number;
  @Input() currentDate: number;
  private temperaturePoints: TemperaturePoint[] = [];

  /**
  * Constructor
  * @param  {TemperatureService} private temperatureService
  */
  constructor(private temperatureService: TemperatureService) {
    Highcharts.setOptions({
      global : {
        timezoneOffset : new Date().getTimezoneOffset()
      }
    });
  }

  public ngOnInit() {
    // Subscribe to the temperature rest service to get
    // the today temperature readings on init
    this.temperatureService
      .getTodayTemperatures()
      .subscribe(
        (todayTemperatures) => {
          console.log('todayTemperatures : ', todayTemperatures);
          todayTemperatures.map((temperature) => {
            this.temperaturePoints.push({
              x: +new Date(temperature.date),
              y: temperature.temperature
            });
          });
          this.chart.series[0].update({
            data : this.temperaturePoints
          }, true);
        }
      );
  }

  private setOption() {
    this.options = {
      title: {
        text: null
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
      navigator: {
        enabled: true
      },
      rangeSelector : {
        enabled: false
      },
      series: [{
        type: 'areaspline',
        name: 'temperature',
        fillColor: {
            linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0},
            stops: [
                [0, '#BBE2DE'],
                [1, '#f4f4f4']
            ]
        },
        color: '#BBE2DE',
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
      this.chart = new Highcharts.stockChart(this.options);
    }
  }

  ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
      if (changes['currentDate'] && this.currentDate) {
        if (this.chart) {
          this.chart.series[0].addPoint([this.currentDate,
            this.currentTemperature], true, false);
        }
      }
   }

  ngOnDestroy() {
    console.log('On destroy : unsubscribed from socket');
    this.unsubscribe();
  }

  private unsubscribe() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  @HostListener('window:beforeunload')
  onBeforeUnload() {
    console.log('Before unload : unsubscribed from socket');
    this.unsubscribe();
  }
}
