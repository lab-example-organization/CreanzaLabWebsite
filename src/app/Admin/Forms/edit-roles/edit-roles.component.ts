import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Classes/user';
import { Person } from 'src/app/Classes/person';
import { FormBuilder } from '@angular/forms';
import { EditmembersService } from '../../edit-members/editmembers.service';

@Component({
  selector: 'app-edit-roles',
  templateUrl: './edit-roles.component.html',
  styleUrls: ['./edit-roles.component.css']
})
export class EditRolesComponent implements OnInit {

  activeUser: User;
  activePerson: Person;
  rolesForm = this.createForm();

  constructor(private fb: FormBuilder,
              private editmemberserv: EditmembersService) { }

  ngOnInit() {
    this.editmemberserv.activeUser.subscribe(aUser => {
      if(aUser.email){
        this.activeUser = aUser;
        this.rolesForm.patchValue({User: aUser.roles[0],
                                Uploader: aUser.roles[1],
                                Admin: aUser.roles[2]});  
      }
    });

    this.editmemberserv.activePerson.subscribe(aPerson => {
      if(aPerson.email){
        this.activePerson = aPerson;
      }
    })
  }


  createForm(){
    return this.fb.group({
      User: Boolean,
      Uploader: Boolean,
      Admin: Boolean
    })
  }

  onEdit(){
    this.activeUser.roles = Object.assign({}, this.rolesForm.value)
    console.log(this.activeUser)
  }
}
