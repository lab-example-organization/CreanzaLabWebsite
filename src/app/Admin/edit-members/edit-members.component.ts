import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { CRUDService } from '../Forms/crud.service';
import { Person } from 'src/app/Classes/person';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/Classes/user';
import { map, tap } from 'rxjs/operators';
import { EditmembersService } from './editmembers.service';
@Component({
  selector: 'app-edit-members',
  templateUrl: './edit-members.component.html',
  styleUrls: ['./edit-members.component.css']
})
export class EditMembersComponent implements OnInit, OnDestroy {

  
  users: User[];
  //people: Person[];
  //person: Person;
  subscribe1: Subscription;
  //subscribe2: Subscription;
  asyncReturn = false;
  

  constructor(
              private CRUD: CRUDService,
              private editmemberserv: EditmembersService) { }

  ngOnInit() {
    this.subscribe1 = this.editmemberserv.userData.subscribe(userData => this.users = userData);
    //this.subscribe2 = this.editmemberserv.personData.subscribe(personData => {
      //this.people = personData;
      //this.person = this.people[0];
    //});
  }

  ngOnDestroy(){
    this.subscribe1.unsubscribe();
    //this.subscribe2.unsubscribe();
  }

  onSwitchUser(who: string){
    if(who === "None"){
      this.editmemberserv.undoActive();
    }else{
      this.editmemberserv.updateActive(who);
    }
    
  }
  onEditRoles(){
    //this.CRUD.editItem(editDoc, path, docKey)
  }

  onEditCard(){

  }
  onEditPage(){
    
  }
}
