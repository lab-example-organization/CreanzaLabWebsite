import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';

import { AdministrationRoutingModule } from './administration-routing.module';

import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { EditCardComponent } from './edit-card/edit-card.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { EditResearchComponent } from './edit-research/edit-research.component';
import { EditMembersComponent } from './edit-members/edit-members.component';
import { EditPublicationsComponent } from './edit-publications/edit-publications.component';
import { UploadPhotoComponent } from './upload-photo/upload-photo.component';
import { PeopleuploadComponent } from './Forms/peopleupload/peopleupload.component';
import { PublicationuploadComponent } from './Forms/publicationupload/publicationupload.component';
import { NewMemberComponent } from './Forms/new-member/new-member.component';
import { EditRolesComponent } from '../Admin/Forms/edit-roles/edit-roles.component';
import { EditIndividualComponent } from '../Admin/Forms/edit-individual/edit-individual.component';
import { AddpubnamesComponent } from './Forms/addpubnames/addpubnames.component';


@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
    EditCardComponent,
    EditPageComponent,
    EditResearchComponent,
    EditMembersComponent,
    EditPublicationsComponent,
    UploadPhotoComponent,
    PeopleuploadComponent,
    PublicationuploadComponent,
    NewMemberComponent,
    EditRolesComponent,
    EditIndividualComponent,
    AddpubnamesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatListModule,
    AdministrationRoutingModule
  ]
})

export class AdministrationModule { }
