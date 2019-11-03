import { Component, OnInit } from '@angular/core';
import { Publication } from '../Classes/publication';
import { PublicationsService } from './publications.service';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {

  publications$: Observable<Publication[]>;
  nicoleTrainees: RegExp[];
  mainAuthor = RegExp('Creanza N*');
  subscription: Subscription;

  constructor(private publicationserv: PublicationsService) { }

  ngOnInit() {
    this.publications$ = this.publicationserv.getPublications().pipe(
      map(pubs => pubs.sort((a,b) => (a.year > b.year ? -1 : a.year < b.year ? 1 : 0)))
      );
      this.subscription = this.publicationserv.getTrainees().pipe(
        map(trainees => trainees.map(trainee => RegExp(`${trainee.name}*`)))
      ).subscribe(trainees => this.nicoleTrainees = trainees);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  
}
