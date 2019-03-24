import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';


import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PeopleComponent } from './people/people.component';
import { PublicationsComponent } from './publications/publications.component';
import { HomeComponent } from './home/home.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { IndividualComponent } from './individual/individual.component';
import { InteractiveProjectsComponent } from './interactive-projects/interactive-projects.component';

import { AdministrationModule } from './Admin/administration.module';

import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';
import { ResearchComponent } from './research/research.component';
import { GridBlowUpModule } from './GridBlowUp/grid-blow-up.module';

@NgModule({
  declarations: [
    AppComponent,
    PeopleComponent,
    PublicationsComponent,
    HomeComponent,
    UserInfoComponent,
    IndividualComponent,
    InteractiveProjectsComponent,
    ResearchComponent,
  ],
  imports: [
    BrowserModule,

    GridBlowUpModule,

    MatButtonModule,
    MatCardModule,
    MatListModule,

    NgxTwitterTimelineModule,

    ReactiveFormsModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireStorageModule, // imports firebase/auth, only needed for auth features,
    AngularFireAuthModule, // imports firebase/storage only needed for storage features

    AdministrationModule,

    AppRoutingModule// this should always be LAST!!!
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
