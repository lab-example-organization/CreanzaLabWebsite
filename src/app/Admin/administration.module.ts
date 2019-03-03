import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { EditCardComponent } from './edit-card/edit-card.component';

@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
    EditCardComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule
  ]
})

export class AdministrationModule { }
