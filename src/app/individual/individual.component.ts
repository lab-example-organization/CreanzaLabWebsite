import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Person } from '../Classes/person';
import { PeopleService } from '../people/people.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { SocialMedia } from '../Classes/socialMedia';


@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.css']
})
export class IndividualComponent implements OnInit {
  person$: Observable<Person>;
  socialMedia: SocialMedia;
  constructor(private peopleserv: PeopleService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: {person: Person}) => {
      this.person$ = of(data.person);
      this.socialMedia = JSON.parse(data.person.socialMedia);
    });
  }

}
