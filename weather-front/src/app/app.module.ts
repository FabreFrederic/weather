import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ChartModule } from 'angular-highcharts';
import { AppComponent } from './app.component';

import { ChartComponent } from './chart/chart.component';
import { TemperatureService } from './chart/temperature.service';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartModule
  ],
  providers: [
    TemperatureService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
