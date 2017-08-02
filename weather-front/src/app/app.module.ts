import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MdSidenavModule, MdToolbarModule, MdCardModule } from '@angular/material';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { TemperatureService } from './chart/temperature.service';
import { ValueCircleComponent } from './value-circle/value-circle/value-circle.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    ValueCircleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    MdSidenavModule,
    MdToolbarModule,
    MdCardModule
  ],
  providers: [
    TemperatureService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
