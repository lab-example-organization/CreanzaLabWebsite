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
  activeUser: User;
  activePerson: Person;
  roles = this.createRolesForm();

  constructor(private fb: FormBuilder,
              private CRUD: CRUDService,
              private editmemberserv: EditmembersService) { }

  ngOnInit() {
    this.editmemberserv.userData.subscribe(userData => this.users = userData);
    this.editmemberserv.personData.subscribe(personData => this.people = personData);
  }

  
  createRolesForm(){
    return this.fb.group({
      User: Boolean,
      Uploader: Boolean,
      Admin: Boolean
    })
  }


  onSwitchUser(who: string){
    console.log(who);
    this.editmemberserv.fetchUser(who).subscribe(user => {
      this.activeUser = user;
      this.roles.patchValue({User: this.activeUser.roles[0],
                            Uploader: this.activeUser.roles[1],
                            Amind: this.activeUser.roles[2]});
    });
    this.editmemberserv.fetchPerson(who).subscribe(person => this.activePerson = person);
  }
  onEditRoles(){
    //this.CRUD.editItem(editDoc, path, docKey)
  }

  onEditCard(){

  }
  onEditPage(){
    
  }
}
