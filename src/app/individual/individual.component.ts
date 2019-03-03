import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../Classes/person';
import { PeopleService } from '../people/people.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.css']
})
export class IndividualComponent implements OnInit {
  
  people$:Observable<Person>;
  people:Person;
  constructor(private peopleserv: PeopleService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.people$ = this.peopleserv.getPeople().pipe(
      map(people=>people[0])
    );
    this.route.data.subscribe((data: {person: any})=> this.people = data.person)
  }

}
