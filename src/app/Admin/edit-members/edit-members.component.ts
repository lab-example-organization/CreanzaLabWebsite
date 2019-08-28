import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { CRUDService } from '../Forms/crud.service';
import { Person, Project, Award } from 'src/app/Classes/person';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/Classes/user';
import { map, tap } from 'rxjs/operators';
import { EditmembersService } from './editmembers.service';
import { SocialMedia } from 'src/app/Classes/socialMedia';
import { Publication } from 'src/app/Classes/publication';
@Component({
  selector: 'app-edit-members',
  templateUrl: './edit-members.component.html',
  styleUrls: ['./edit-members.component.css']
})
export class EditMembersComponent implements OnInit, OnDestroy {

  
  users: User[];
  people: Person[];
  keys: string[] = [];
  activePerson = this.makePerson();
  key = '';
  subscribe1: Subscription;
  subscribe2: Subscription;
  asyncReturn = false;
  

  constructor(private editmemberserv: EditmembersService) { }

  ngOnInit() {
    this.subscribe1 = this.editmemberserv.userData.subscribe(userData => this.users = userData);
    this.subscribe2 = this.editmemberserv.personData.subscribe(personData => {
      this.people = personData;
      this.activePerson = this.makePerson();
      this.key = '';
      if(personData[0].key){
        personData.forEach(person => this.keys.push(person.key));
      }
    });
  }

  ngOnDestroy(){
    this.subscribe1.unsubscribe();
    this.subscribe2.unsubscribe();
  }

  onSwitchUser(who: string){
    if(who === "None"){
      this.editmemberserv.undoActive();
    }else{
      this.editmemberserv.updateActive(who);
    }
  }

  onSwitchMember(index: number){
    if(index >= 0){
      this.activePerson = this.people[index];
      this.key = this.keys[index];
    }else{
      this.activePerson = this.makePerson();
      this.key = '';
    }
  }

  makePerson(){
    let blankPerson = new Person;
    blankPerson.socialMedia = JSON.stringify(new SocialMedia);
    blankPerson.projects = JSON.stringify([new Project]);
    blankPerson.awards = JSON.stringify([new Award]);
    blankPerson.publications = JSON.stringify([new Publication]);
    return blankPerson;
  }
}
