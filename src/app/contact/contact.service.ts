import { Injectable } from '@angular/core';
import { FirebaseService } from '../GlobalServices/firebase.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private firebaseserv: FirebaseService) { }

  getResearch() {
    return this.firebaseserv.returnCollect('contact').pipe(map(contact => contact[0]));
  }
}
