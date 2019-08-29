import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ContactService } from './contact.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contact$: Observable<string>;
  gridData: any[];
  subscription: Subscription;
 
  constructor(private contactserv: ContactService,
              public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.contact$ = this.contactserv.getResearch();
  }
}
