import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { EditCardComponent } from './edit-card/edit-card.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { EditMembersComponent } from './edit-members/edit-members.component';
import { EditResearchComponent } from './edit-research/edit-research.component';
import { EditPublicationsComponent } from './edit-publications/edit-publications.component';
import { UploadPhotoComponent } from './upload-photo/upload-photo.component';

const adminRoutes: Routes = [
  {path:'users', component: AdminComponent,
    children: [
      {path: '', component: LoginComponent,
      children: [
        {path:'edit', canActivate: [AuthGuard],
        children: [
          {path: 'card', component: EditCardComponent},
          {path: 'page', component: EditPageComponent},
        ]},
        {path:'upload', canActivate: [AuthGuard],
        children: [
          {path: 'labphotos', component: UploadPhotoComponent}
        ]},
        {path:'admin', canActivate: [AuthGuard],
        children: [
          {path: 'research', component: EditResearchComponent},
          {path: 'members', component: EditMembersComponent},
          {path: 'publications', component: EditPublicationsComponent}
        ]}
      ]}
    ]}
  ];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})

export class AdministrationRoutingModule { }
