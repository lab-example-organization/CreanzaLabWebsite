import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeopleComponent } from './people/people.component';
import { PeopleuploadComponent } from './peopleupload/peopleupload.component';
import { PublicationsComponent } from './publications/publications.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { IndividualComponent } from './individual/individual.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { InteractiveProjectsComponent } from './interactive-projects/interactive-projects.component';
import { visitAstChildren } from '@angular/compiler';
import { ResolverService } from './individual/resolver.service';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'people', component: PeopleComponent},
  {path: 'people/:individual', component: IndividualComponent,
  resolve: {person: ResolverService}},
  {path: 'publications', component: PublicationsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'individual', component: IndividualComponent},
  {path: 'userinfo', component: UserInfoComponent},
  {path: 'interactive', component: InteractiveProjectsComponent},
  {path: 'peopleupload', component: PeopleuploadComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
