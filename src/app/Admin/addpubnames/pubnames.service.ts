import { Injectable } from '@angular/core';
import { FirebaseService } from '../../GlobalServices/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class PubnamesService {

  constructor(private firebaseserv: FirebaseService) { }
  
  getTrainees() {
    return this.firebaseserv.returnCollectionWithKeys('trainees');
  }
}
