import { Component, OnInit } from '@angular/core';
import { Person } from '../Classes/person';
import { PeopleService} from './people.service';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})

export class PeopleComponent implements OnInit {

  position = {PI: 1, PostDoc: 2, GraduateStudent: 3, UndergraduateStudent: 4, HighSchoolStudent: 5, ResearchAssistant: 6};

  people$: Observable<Person[]>;
  alumni$: Observable<Person[]>;

  constructor(private peopleserv: PeopleService) { }

  ngOnInit() {
    this.people$ = this.peopleserv.getPeople().pipe(
      tap(people => this.alumni$ = of (people.filter(person => person.description === 'Alumni'))),
      tap(() => this.alumni$.subscribe(x => console.log(x[0]))),
      map(people => people.filter(person => person.description !== 'Alumni')),
      map(people => people.sort(
        (a, b) => {
          return this.position[a.description.replace(/[-|\s]/g, '')] <
                 this.position[b.description.replace(/[-|\s]/g, '')] ? -1 :
                 this.position[a.description.replace(/[-|\s]/g, '')] ===
                 this.position[b.description.replace(/[-|\s]/g, '')] ? 0 : 1;
        })));
  }
}
