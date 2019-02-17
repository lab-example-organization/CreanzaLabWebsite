import { Injectable } from '@angular/core';
import { FirebaseService } from '../GlobalServices/firebase.service'
@Injectable({
  providedIn: 'root'
})

export class PeopleService {

  constructor(private firebaseserv:FirebaseService) { }

  getPeople(){
    return this.firebaseserv.returnCollect('people')
  }
  getPortrait(){
    return this.firebaseserv.returnCollect('images')
  }
}