import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule }        from '@angular/fire';
import { AngularFirestoreModule }   from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule }    from '@angular/fire/auth';
import { environment }              from '../environments/environment';


import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PeopleComponent } from './people/people.component';
import { PublicationsComponent } from './publications/publications.component';

@NgModule({
  declarations: [
    AppComponent,
    PeopleComponent,
    PublicationsComponent
  ],
  imports: [
    BrowserModule,

    MatCardModule,
    MatListModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireStorageModule, // imports firebase/auth, only needed for auth features,
    AngularFireAuthModule, // imports firebase/storage only needed for storage features

    AppRoutingModule// this should always be LAST!!!
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
