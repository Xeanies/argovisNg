import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfviewComponent } from './profview.component';
import { TableComponent } from './table/table.component';
import { MaterialModule } from '../material/material.module';
import { ColorChartComponent } from './color-chart/color-chart.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';
import { PlatformWindowComponent } from './platform-window/platform-window.component';
import { GlobeScatterComponent } from './globe-scatter/globe-scatter.component';
import { ColorbarComponent } from './colorbar/colorbar.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { VarplotComponent } from './varplot/varplot.component';
 
PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [ProfviewComponent, TableComponent, ColorChartComponent, PlatformWindowComponent, GlobeScatterComponent, ColorbarComponent, LineChartComponent, VarplotComponent],
  imports: [
    CommonModule,
    MaterialModule,
    PlotlyModule,
    MatCheckboxModule,
    ReactiveFormsModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class ProfviewModule { }
