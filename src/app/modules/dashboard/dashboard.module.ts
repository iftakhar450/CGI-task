import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from 'src/app/material/material.module';
import { TableModule } from 'src/app/components/table/table.module';
import { LineChartModule } from 'src/app/components/line-chart/line-chart.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    LineChartModule,
    FlexLayoutModule,
    

  ]
})
export class DashboardModule { }
