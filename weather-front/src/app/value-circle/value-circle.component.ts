import { Component, AfterViewInit, ViewChild, ElementRef, Input, SimpleChange } from '@angular/core';
import * as highcharts from 'highcharts';

import { ValueCircleConfig } from './value-circle-config';

declare const require: any;
const highchartsMore = require('highcharts/highcharts-more');
const solidGauge = require('highcharts/modules/solid-gauge');

@Component({
  selector: 'app-value-circle',
  templateUrl: './value-circle.component.html',
  styleUrls: ['./value-circle.component.css']
})
export class ValueCircleComponent implements AfterViewInit {
  @ViewChild('gaugeContainer') public gaugeContainer: ElementRef;

  @Input() valueCircleConfig: ValueCircleConfig;
  @Input() valueToDisplay: number;

  gauge: any;
  options: any;
  value: any;

  constructor() {
    highchartsMore(highcharts);
    solidGauge(highcharts);
  }

  private setOption() {
    this.options = {
      chart: {
          type: 'solidgauge'
      },
      title: null,
      pane: {
        center: ['50%', '50%'],
        size: '100%',
         startAngle: this.valueCircleConfig.startAngle,
         endAngle: this.valueCircleConfig.endAngle,
         background: {
             backgroundColor: '#E5E7E6',
             borderWidth: 0,
             innerRadius: '80%',
             outerRadius: '100%',
             shape: 'arc'
         }
      },
      tooltip: {
          enabled: true
      },
      // the value axis
      yAxis: {
        min: this.valueCircleConfig.min,
        max: this.valueCircleConfig.max,
        stops: [
            [0, '#000088'],
            [16 / 60, '#000088'],
            [17 / 60, '#5555ff'],
            [27 / 60, '#5555ff'],
            [28 / 60, '#00ff00'],
            [38 / 60, '#00ff00'],
            [40 / 60, '#ff8c00'],
            [44 / 60, '#ff8c00'],
            [45 / 60, '#ff0000']
        ],
        lineWidth: 0,
        minorTickInterval: null,
        tickPixelInterval: null,
        tickWidth: 0,
        title: {
            y: -70
        }
      },
      credits: {
        enabled: false
      },
      plotOptions: {
          solidgauge: {
            innerRadius: '80%',
              dataLabels: {
                  borderWidth: 0,
                  y: -18
              }
          }
      },
      series: [{
          name: this.valueCircleConfig.serieName,
          data: this.valueToDisplay,
          type: 'solidgauge',
          tooltip: {
              valueSuffix: this.valueCircleConfig.tooltipValueSuffix
          },
          dataLabels: {
            style: {
              fontSize: '18px',
              color: '#7F7F7F',
              textalign: 'center'
            },
            format: '{y} °C'
          }
      }]
    };
  }

  ngAfterViewInit() {
    this.setOption();
    if (this.gaugeContainer && this.gaugeContainer.nativeElement) {
      this.options.chart = {
          renderTo: this.gaugeContainer.nativeElement
      };
      this.gauge = new highcharts.Chart(this.options);
    }
  }

  public ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
    if (changes['valueToDisplay'] && this.valueToDisplay) {
      if (this.gauge) {
        this.gauge.series[0].setData([this.valueToDisplay], true, false);
      }
    }
  }
}
