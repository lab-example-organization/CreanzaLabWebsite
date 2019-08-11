import { Component, OnInit, OnDestroy } from '@angular/core';
import { ParkerService } from './parker.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  SignOnName: string;
  nameSub: Subscription;
  constructor(private park: ParkerService) { }
  
  ngOnInit() {
    this.nameSub = this.park.SignOnName.subscribe(name => this.SignOnName= name);
  }
  ngOnDestroy(){
    this.nameSub.unsubscribe();
  }
}
