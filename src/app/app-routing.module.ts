import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeopleComponent } from './people/people.component';
import { PeopleuploadComponent } from './peopleupload/peopleupload.component';
import { PublicationsComponent } from './publications/publications.component';

const routes: Routes = [
  // {path: '', component: home}
  {path: 'people', component: PeopleComponent},
  {path: 'publications', component: PublicationsComponent},
  {path: 'peopleupload', component: PeopleuploadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
