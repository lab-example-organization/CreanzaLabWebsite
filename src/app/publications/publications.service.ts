import { Injectable } from '@angular/core';
import { FirebaseService } from '../GlobalServices/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class PublicationsService {

  constructor(private firebaseserv: FirebaseService) { }

  getPublications() {
    return this.firebaseserv.returnCollect('publications');
  }
  getTrainees() {
    return this.firebaseserv.returnCollect('trainees');
  }
}
