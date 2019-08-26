import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { User } from 'src/app/Classes/user';
import { Person } from 'src/app/Classes/person';
import { CRUDService } from '../Forms/crud.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EditmembersService implements OnDestroy{

  userData = new BehaviorSubject<User[]>([new User]);
  personData = new BehaviorSubject<Person[]>([new Person]);
  activeUser = new BehaviorSubject<User>(new User);
  activePerson =  new BehaviorSubject<Person>(new Person);
  subscribe1: Subscription;
  subscribe2: Subscription;

  constructor(private CRUD: CRUDService) {
    this.subscribe1 = CRUD.fetchAllData('Users').subscribe( users =>
      this.userData.next(users)
    )

    this.subscribe2 = CRUD.fetchAllData('people').subscribe( person =>
      this.personData.next(person)
    )
  }
  
  ngOnDestroy(){
    this.subscribe1.unsubscribe();
    this.subscribe2.unsubscribe();
  }

  getAllUsers(){
    return this.userData;
  }
  getAllPeople(){
    return this.personData;
  }

  fetchUser(email:string){
    return this.getAllUsers().pipe(map(users =>
      users.find(user => user.email == email)
    ));
  }
  fetchPerson(email:string){
    return this.getAllPeople().pipe(map(people =>
      people.find(person => person.email == email)
    ));
  }

  updateActive(email: string){
    this.fetchUser(email).subscribe(user => this.activeUser.next(user));
    this.fetchPerson(email).subscribe(person => this.activePerson.next(person));
  }

  undoActive(){
    this.activeUser.next(new User);
    this.activePerson.next(new Person);
  }

}
