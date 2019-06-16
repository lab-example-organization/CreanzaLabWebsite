import { Injectable } from '@angular/core';
import { FirebaseService } from '../GlobalServices/firebase.service';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ResearchService {

  constructor(private firebaseserv: FirebaseService) { }

  getResearch() {
    return this.firebaseserv.returnCollect('research').pipe(map(research => research[0]));
  }
}
