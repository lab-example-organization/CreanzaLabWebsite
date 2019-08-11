import { Component, OnInit } from '@angular/core';
import { Publication } from '../Classes/publication';
import { PublicationsService } from './publications.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {

  publications$: Observable<Publication[]>;
  MainAuthor = RegExp('Creanza N*')

  constructor(private publicationserv: PublicationsService) { }

  ngOnInit() {
    this.publications$ = this.publicationserv.getPublications().pipe(
      map(pubs => pubs.sort((a,b) => (a.year > b.year ? -1 : a.year < b.year ? 1 : 0)))
      );
  }

}
