import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  people: Person;
  socialMedia: SocialMedia;
  constructor(private peopleserv: PeopleService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: {person: any}) => {
      this.people = data.person;
      this.socialMedia = JSON.parse(this.people.socialMedia);
    });
  }

}
