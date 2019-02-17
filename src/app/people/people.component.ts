import { Component, OnInit } from '@angular/core';
import { Person } from '../Classes/person';
import { PeopleService} from './people.service';
import { Observable } from 'rxjs';
//import { GroupPhoto } from '../Classes/images';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})

export class PeopleComponent implements OnInit {

  people$:Observable<Person[]>;
  //images$:Observable<GroupPhoto[]>;
  //groupPhoto: GroupPhoto;

  constructor(private peopleserv: PeopleService) { }

  ngOnInit() {
    this.people$ = this.peopleserv.getPeople();
  }
}
