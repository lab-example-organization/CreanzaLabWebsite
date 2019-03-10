import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { CRUDService } from '../Forms/crud.service';
@Component({
  selector: 'app-edit-members',
  templateUrl: './edit-members.component.html',
  styleUrls: ['./edit-members.component.css']
})
export class EditMembersComponent implements OnInit {

  newPersonForm = this.createForm();
  message: string;
  positions: string[] = ['High-schooler', 'Undergraduate Student', 'Graduate Student', 'Post-Doc', 'PI', 'Alumni', 'Rotation Student'];

  constructor(private fb: FormBuilder,
              private CRUD: CRUDService) { }

  ngOnInit() {
  }

  createForm() {
    const Year = formatDate(new Date, 'yyyy', 'en');
    return this.fb.group({
    email: ['', Validators.required],
    name: ['', Validators.required],
    description: ['Undergraduate Student', Validators.required],
    startYear: Year,
    endingYear: 'Present'
    });
  }

  onSubmit() {
    const newPerson = Object.assign({}, this.newPersonForm.value);
    newPerson.portraitLink = 'https://firebasestorage.googleapis.com/v0/b/creanza-lab-208216.appspot.com' +
                             '/o/Profiles%2FPlaceHolder.jpg?alt=media&token=21990311-773c-41ad-9949-c4a34812db2a';
    this.CRUD.uploadItem(newPerson, 'people').then(() => this.message = 'successful upload!');
  }

}
