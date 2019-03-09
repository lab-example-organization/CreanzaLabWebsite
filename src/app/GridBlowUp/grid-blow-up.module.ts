import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from '../GridBlowUp/grid/grid.component';
import { BlowUpComponent } from './blow-up/blow-up.component';

@NgModule({
  declarations: [
    GridComponent,
    BlowUpComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GridComponent,
    BlowUpComponent
  ]
})
export class GridBlowUpModule { }
