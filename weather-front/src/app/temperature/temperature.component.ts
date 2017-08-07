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
  public currentTemperature: number;
  public currentDate: number;

  public minValueCircleConfig: ValueCircleConfig;
  public minValue: Number;

  public currentValueCircleConfig: ValueCircleConfig;

  public maxValueCircleConfig: ValueCircleConfig;
  public maxValue: Number;

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
      message => {
        const newDate: number = +new Date(message.date);
        this.currentDate = newDate;
        this.currentTemperature = message.temperature;
    });
  }

  private init() {
    this.minValueCircleConfig = new ValueCircleConfig;
    this.minValueCircleConfig.serieName = 'Température minimum '
    this.minValueCircleConfig.startAngle = 0;
    this.minValueCircleConfig.endAngle = 360;
    this.minValueCircleConfig.min = -20;
    this.minValueCircleConfig.max = 45;
    this.minValue = 14;
    this.minValueCircleConfig.tooltipValueSuffix = '° C';

    this.currentValueCircleConfig = new ValueCircleConfig;
    this.currentValueCircleConfig.serieName = 'Température '
    this.currentValueCircleConfig.startAngle = 0;
    this.currentValueCircleConfig.endAngle = 360;
    this.currentValueCircleConfig.min = -20;
    this.currentValueCircleConfig.max = 45;
    this.minValueCircleConfig.tooltipValueSuffix = '° C';

    this.maxValueCircleConfig = new ValueCircleConfig;
    this.maxValueCircleConfig.serieName = 'Température maximum '
    this.maxValueCircleConfig.startAngle = 0;
    this.maxValueCircleConfig.endAngle = 360;
    this.maxValueCircleConfig.min = -20;
    this.maxValueCircleConfig.max = 45;
    this.maxValue = 38;
    this.minValueCircleConfig.tooltipValueSuffix = '° C';
  }

  public ngOnInit() {}

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
