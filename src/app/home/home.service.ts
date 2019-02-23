import { Injectable } from '@angular/core';
import { FirebaseService } from '../GlobalServices/firebase.service';

@Injectable({
  providedIn: 'root'
})

export class HomeService {

  constructor(private firebaseserv:FirebaseService) { }
}
