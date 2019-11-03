import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeopleComponent } from './people/people.component';
import { PublicationsComponent } from './publications/publications.component';
import { HomeComponent } from './home/home.component';
import { IndividualComponent } from './individual/individual.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { InteractiveProjectsComponent } from './interactive-projects/interactive-projects.component';
import { ContactComponent } from './contact/contact.component';

import { ResolverService } from './individual/resolver.service';
import { ResearchComponent } from './research/research.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'people', component: PeopleComponent},
  {path: 'people/:individual', component: IndividualComponent,
  resolve: {person: ResolverService}},
  {path: 'publications', component: PublicationsComponent},
  {path: 'individual', component: IndividualComponent},
  {path: 'userinfo', component: UserInfoComponent},
  {path: 'interactive', component: InteractiveProjectsComponent},
  {path: 'research', component: ResearchComponent},
  {path: 'contact', component: ContactComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
