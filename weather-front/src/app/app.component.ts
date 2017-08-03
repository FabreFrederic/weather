import { Component, Input } from '@angular/core';
import { ValueCircleConfig } from './value-circle/value-circle-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public minValueCircleConfig: ValueCircleConfig;
  public minValue: Number;

  public currentValueCircleConfig: ValueCircleConfig;
  public currentValue: Number;

  public maxValueCircleConfig: ValueCircleConfig;
  public maxValue: Number;

  constructor() {
    this.minValueCircleConfig = new ValueCircleConfig;
    this.minValueCircleConfig.serieName = 'Température minimum '
    this.minValueCircleConfig.startAngle = -180;
    this.minValueCircleConfig.endAngle = 90;
    this.minValueCircleConfig.min = -20;
    this.minValueCircleConfig.max = 45;
    this.minValue = 14;
    this.minValueCircleConfig.tooltipValueSuffix = '° C';

    this.currentValueCircleConfig = new ValueCircleConfig;
    this.currentValueCircleConfig.serieName = 'Température '
    this.currentValueCircleConfig.startAngle = -180;
    this.currentValueCircleConfig.endAngle = 90;
    this.currentValueCircleConfig.min = -20;
    this.currentValueCircleConfig.max = 45;
    this.currentValue = 34;
    this.minValueCircleConfig.tooltipValueSuffix = '° C';

    this.maxValueCircleConfig = new ValueCircleConfig;
    this.maxValueCircleConfig.serieName = 'Température maximum '
    this.maxValueCircleConfig.startAngle = -180;
    this.maxValueCircleConfig.endAngle = 90;
    this.maxValueCircleConfig.min = -20;
    this.maxValueCircleConfig.max = 45;
    this.maxValue = 38;
    this.minValueCircleConfig.tooltipValueSuffix = '° C';
  }
}
