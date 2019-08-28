import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contact$: Observable<string>;
  gridData: any[];
  subscription: Subscription;
 
  constructor(private contactserv: ContactService) { }

  ngOnInit() {
    this.contact$ = this.contactserv.getResearch();
  }
}
