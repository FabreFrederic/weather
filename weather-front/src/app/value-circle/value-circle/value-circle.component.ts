import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as highcharts from 'highcharts';

declare var require: any;
var highchartsMore = require('highcharts/highcharts-more');
var solidGauge = require('highcharts/modules/solid-gauge');

@Component({
  selector: 'app-value-circle',
  templateUrl: './value-circle.component.html',
  styleUrls: ['./value-circle.component.css']
})
export class ValueCircleComponent implements AfterViewInit, OnInit {
  @ViewChild('gaugeContainer') public gaugeContainer: ElementRef;

  gauge: any;
  options: any;
  value: any;

  constructor() {
    highchartsMore(highcharts);
    solidGauge(highcharts);
  }

  ngOnInit() {
  }

  private setOption() {
    this.options = {
      chart: {

       },
      title: {
        text: 'Current temperature'
      },
      pane: {
          center: ['50%', '50%'],
          size: '100%',
          startAngle: 0,
          endAngle: 360,
          background: {
              backgroundColor: '#EEE',
              innerRadius: '60%',
              outerRadius: '100%',
              shape: 'arc'
          }
      },
      tooltip: {
          enabled: true
      },
      // the value axis
      yAxis: {
        min: 0,
        max: 200,
        stops: [
            [0.1, '#55BF3B'], // green
            [0.5, '#DDDF0D'], // yellow
            [0.9, '#DF5353'] // red
        ],
        lineWidth: 0,
        minorTickInterval: null,
        tickPixelInterval: 400,
        tickWidth: 0,
        title: {
            y: -70
        },
        labels: {
            enabled:false
        }
      },
      credits: {
        enabled: false
      },
      plotOptions: {
          solidgauge: {
              dataLabels: {
                  y: -20,
                  borderWidth: 0,
                  useHTML: true
              }
          }
      },
      series: [{
          name: 'Current temperature',
          data: [30],
          type: 'solidgauge',
          tooltip: {
              valueSuffix: ' ° C'
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
}
