import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MdIconRegistry} from '@angular/material';
import { Subject } from 'rxjs/Subject';

import { ValueCircleConfig } from '../value-circle/value-circle-config';
import { TemperatureService } from './temperature.service';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public measurementUnitTemperature = '°C';

  public minValueCircleConfig: ValueCircleConfig;
  public minValue: number;
  public minDate: Date;

  public currentValueCircleConfig: ValueCircleConfig;
  public currentValue: number;
  public currentDate: Date;

  public maxValueCircleConfig: ValueCircleConfig;
  public maxValue: number;
  public maxDate: Date;

  public averageValueCircleConfig: ValueCircleConfig;
  public averageValue: number;
  public averageDate: Date;

  /**
  * Constructor
  * @param  {TemperatureService} private temperatureService
  */
  constructor(private temperatureService: TemperatureService,
      iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {

    iconRegistry.addSvgIcon(
    'temperature-icon',
    sanitizer.bypassSecurityTrustResourceUrl('assets/img/temperature-icon.svg'));

    this.init();

    // Subscribe to the temperature socket to get the last temperature readings
    this.temperatureService.getTemperature()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
      temperatureMessage => {
        this.currentDate = new Date(temperatureMessage.date);
        this.currentValue = temperatureMessage.temperature;
    });

    this.temperatureService.getTodayMinTemperature()
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
    message => {
      this.minDate = new Date(message.date);
      this.minValue = message.temperature;
    });

    this.temperatureService.getTodayMaxTemperature()
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
    message => {
      this.maxDate = new Date(message.date);
      this.maxValue = message.temperature;
    });

    this.temperatureService.getTodayAverageTemperature()
     .takeUntil(this.ngUnsubscribe)
     .subscribe(
     message => {
       this.averageDate = new Date(message.date);
       this.averageValue = message.temperature;
     });
  }

  private init() {
    this.minValueCircleConfig = new ValueCircleConfig;
    this.minValueCircleConfig.serieName = 'Température minimum '
    this.minValueCircleConfig.startAngle = 0;
    this.minValueCircleConfig.endAngle = 360;
    this.minValueCircleConfig.min = -20;
    this.minValueCircleConfig.max = 45;
    this.minValueCircleConfig.tooltipValueSuffix = '°C';

    this.currentValueCircleConfig = new ValueCircleConfig;
    this.currentValueCircleConfig.serieName = 'Température '
    this.currentValueCircleConfig.startAngle = 0;
    this.currentValueCircleConfig.endAngle = 360;
    this.currentValueCircleConfig.min = -20;
    this.currentValueCircleConfig.max = 45;
    this.currentValueCircleConfig.tooltipValueSuffix = '°C';

    this.maxValueCircleConfig = new ValueCircleConfig;
    this.maxValueCircleConfig.serieName = 'Température maximum '
    this.maxValueCircleConfig.startAngle = 0;
    this.maxValueCircleConfig.endAngle = 360;
    this.maxValueCircleConfig.min = -20;
    this.maxValueCircleConfig.max = 45;
    this.maxValueCircleConfig.tooltipValueSuffix = '°C';

    this.averageValueCircleConfig = new ValueCircleConfig;
    this.averageValueCircleConfig.serieName = 'Température maximum '
    this.averageValueCircleConfig.startAngle = 0;
    this.averageValueCircleConfig.endAngle = 360;
    this.averageValueCircleConfig.min = -20;
    this.averageValueCircleConfig.max = 45;
    this.averageValueCircleConfig.tooltipValueSuffix = '°C';
  }

  public ngOnInit() {
    this.temperatureService
      .getLastTodayTemperature()
      .subscribe(
        (todayTemperature) => {
          console.log('todayTemperature : ' + todayTemperature);
          if (todayTemperature[0] !== undefined &&
            todayTemperature[0].temperature !== undefined) {
            this.currentValue = todayTemperature[0].temperature;
            this.currentDate = new Date(todayTemperature[0].date);
          }
        }
      );

    this.temperatureService
      .getLastTodayMinTemperature()
      .subscribe(
        (todayMinTemperature) => {
          console.log('todayMinTemperature : ' + todayMinTemperature);
          if (todayMinTemperature[0] !== undefined &&
            todayMinTemperature[0].temperature !== undefined) {
            this.minValue = todayMinTemperature[0].temperature;
            this.minDate = new Date(todayMinTemperature[0].date);
          }
        }
      );

    this.temperatureService
      .getLastTodayMaxTemperature()
      .subscribe(
        (todayMaxTemperature) => {
          console.log('todayMaxTemperature : ' + todayMaxTemperature);
          if (todayMaxTemperature[0] !== undefined &&
            todayMaxTemperature[0].temperature !== undefined) {
            this.maxValue = todayMaxTemperature[0].temperature;
            this.maxDate = new Date(todayMaxTemperature[0].date);
          }
        }
      );

    this.temperatureService
      .getLastTodayAverageTemperature()
      .subscribe(
        (todayAverageTemperature) => {
          console.log('todayAverageTemperature : ', todayAverageTemperature);
          if (todayAverageTemperature !== undefined &&
            todayAverageTemperature.temperature !== undefined) {
            this.averageValue = todayAverageTemperature.temperature;
            this.averageDate = new Date(todayAverageTemperature.date);
          }
        }
      );
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
