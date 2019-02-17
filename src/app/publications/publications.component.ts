import { Component, OnInit } from '@angular/core';
import { Publication } from '../Classes/publication';
import { PublicationsService } from './publications.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {

  publications$: Observable<Publication[]>;
  constructor(private publicationserv: PublicationsService) { }

  ngOnInit() {
    this.publications$ = this.publicationserv.getPublications();
  }

}
