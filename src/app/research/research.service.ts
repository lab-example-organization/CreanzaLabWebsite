import { Injectable } from '@angular/core';
import { FirebaseService } from '../GlobalServices/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class ResearchService {

  constructor(private firebaseserv: FirebaseService) { }

  getResearch() {
    return this.firebaseserv.returnCollect('research');
  }
}
