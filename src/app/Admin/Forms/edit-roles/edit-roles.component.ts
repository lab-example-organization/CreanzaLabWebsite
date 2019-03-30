import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Classes/user';
import { Person } from 'src/app/Classes/person';
import { FormBuilder } from '@angular/forms';
import { EditmembersService } from '../../edit-members/editmembers.service';
import { CRUDService } from '../crud.service';

@Component({
  selector: 'app-edit-roles',
  templateUrl: './edit-roles.component.html',
  styleUrls: ['./edit-roles.component.css']
})
export class EditRolesComponent implements OnInit {

  activeUser: any;
  activePerson: Person;
  rolesForm = this.createForm();

  constructor(private fb: FormBuilder,
              private editmemberserv: EditmembersService,
              private CRUD: CRUDService) { }

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
    console.log(this.rolesForm.controls.User.value)
    this.activeUser.roles[0] = this.rolesForm.controls.User.value;
    this.activeUser.roles[1] = this.rolesForm.controls.Uploader.value;
    this.activeUser.roles[2] = this.rolesForm.controls.Admin.value;
    const key = this.activeUser.key;
    delete(this.activeUser.key);
    //this.CRUD.editItem(this.activeUser, 'Users', key)
    console.log(this.activeUser)
  }
}
