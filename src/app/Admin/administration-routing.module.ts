import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard.guard';
import { EditCardComponent } from './edit-card/edit-card.component';

const adminRoutes: Routes = [
  {path:'admin', component: AdminComponent,
    children: [
      {path: '', component: LoginComponent},
      {path: 'editPerson', component: EditCardComponent, 
      canActivate: [AuthGuard]}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})

export class AdministrationRoutingModule { }
