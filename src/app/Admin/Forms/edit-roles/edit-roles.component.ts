import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/Classes/user';
import { Person } from 'src/app/Classes/person';
import { FormBuilder } from '@angular/forms';
import { EditmembersService } from '../../edit-members/editmembers.service';
import { CRUDService } from '../crud.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-roles',
  templateUrl: './edit-roles.component.html',
  styleUrls: ['./edit-roles.component.css']
})
export class EditRolesComponent implements OnInit, OnDestroy {

  activeUser: any;
  activePerson: Person;
  rolesForm = this.createForm();
  subscribe1: Subscription;
  subscribe2: Subscription;

  constructor(private fb: FormBuilder,
              private editmemberserv: EditmembersService,
              private CRUD: CRUDService) { }

  ngOnInit() {
    this.subscribe1 = this.editmemberserv.activeUser.subscribe(aUser => {
      if(aUser.email){
        this.activeUser = aUser;
        this.rolesForm.patchValue({User: aUser.roles[0],
                                   Uploader: aUser.roles[1],
                                   Admin: aUser.roles[2]});
      }else{
         delete this.activeUser;
         this.rolesForm.patchValue({User: '',
                                   Uploader: '',
                                   Admin: ''});
       }
    });

    this.subscribe2 = this.editmemberserv.activePerson.subscribe(aPerson => {
      if(aPerson.email){
        this.activePerson = aPerson;
      }
    })
  }

  ngOnDestroy(){
    this.subscribe1.unsubscribe();
    this.subscribe2.unsubscribe();
  }

  createForm(){
    return this.fb.group({
      User: Boolean,
      Uploader: Boolean,
      Admin: Boolean
    })
  }

  onEdit(){
    this.activeUser.roles[0] = (this.rolesForm.controls.User.value === 'true' || this.rolesForm.controls.User.value === true);
    this.activeUser.roles[1] = (this.rolesForm.controls.Uploader.value === 'true' || this.rolesForm.controls.Uploader.value === true);
    this.activeUser.roles[2] = (this.rolesForm.controls.Admin.value === 'true' || this.rolesForm.controls.Admin.value === true);
    const key = this.activeUser.key;
    delete this.activeUser.key;
    this.CRUD.editItem(this.activeUser, 'Users', key);
  }

  onRevoke(){
    this.CRUD.deleteItem([], 'Users', this.activeUser.key);
    this.activePerson.email = 'REVOKED'
    const key = this.activePerson.key;
    delete this.activePerson.key;
    this.CRUD.editItem(this.activePerson, 'people', key);
  }
}
