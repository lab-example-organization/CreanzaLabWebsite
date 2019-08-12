import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParkerService {

  SignOnName = new BehaviorSubject<string>("SignOn");
   
  updateSignOn(name:string){
     this.SignOnName.next(name);
   }
}
