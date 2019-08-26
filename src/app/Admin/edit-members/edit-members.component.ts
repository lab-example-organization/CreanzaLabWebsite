import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { CRUDService } from '../Forms/crud.service';
import { Person } from 'src/app/Classes/person';
import { Observable } from 'rxjs';
import { User } from 'src/app/Classes/user';
import { map, tap } from 'rxjs/operators';
import { EditmembersService } from './editmembers.service';
@Component({
  selector: 'app-edit-members',
  templateUrl: './edit-members.component.html',
  styleUrls: ['./edit-members.component.css']
})
export class EditMembersComponent implements OnInit {

  
  users: User[];
  people: Person[];
  person: Person;
  

  constructor(
              private CRUD: CRUDService,
              private editmemberserv: EditmembersService) { }

  ngOnInit() {
    this.editmemberserv.userData.subscribe(userData => this.users = userData);
    this.editmemberserv.personData.subscribe(personData => {
      this.people = personData;
      this.person = this.people[0];
    });
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
