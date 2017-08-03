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
       },
      title: null,
      pane: {
        size: '90%',
         startAngle: this.valueCircleConfig.startAngle,
         endAngle: this.valueCircleConfig.endAngle,
         background: {
             backgroundColor: '#EEE',
             innerRadius: '95%',
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
        tickPixelInterval: 50,
        tickWidth: 1,
        title: {
            y: -70
        },
        labels: {
            enabled: true,
            distance: 10
        }
      },
      credits: {
        enabled: false
      },
      plotOptions: {
          solidgauge: {
              borderWidth: '95%',
              dataLabels: {
                  y: 5,
                  borderWidth: 0,
                  useHTML: true
              }
          }
      },
      series: [{
          name: this.valueCircleConfig.serieName,
          data: this.valueToDisplay,
          type: 'solidgauge',
          linecap: 'square',
          tooltip: {
              valueSuffix: this.valueCircleConfig.tooltipValueSuffix
          },
          dataLabels: {
            style: {
              fontSize: '35px',
              fontWeight: 'bold',
              color: 'black',
              textalign: 'center'
            }
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
