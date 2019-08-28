import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CRUDService } from '../crud.service';
import { formatDate } from '@angular/common';
import { Person, Project, Award } from 'src/app/Classes/person';
import { SocialMedia } from 'src/app/Classes/socialMedia';
import { Publication } from 'src/app/Classes/publication';

@Component({
  selector: 'app-new-memeber',
  templateUrl: './new-memeber.component.html',
  styleUrls: ['./new-memeber.component.css']
})
export class NewMemeberComponent implements OnInit {

  newPersonForm = this.createNewForm();
  message: string;
  positions: string[] = ['High-schooler', 'Undergraduate Student', 'Graduate Student', 'Post-Doc', 'PI', 'Alumni', 'Rotation Student'];
  
  constructor(private fb: FormBuilder,
              private CRUD: CRUDService) { }

  ngOnInit() {
  }

  onSubmit() {    
    const blankPerson = new Person;
    Object.keys(this.newPersonForm.controls).forEach(key => {
      blankPerson[key] = this.newPersonForm.controls[key].value;
    });

    blankPerson.portraitLink = 'https://firebasestorage.googleapis.com/v0/b/creanza-lab-208216.appspot.com' +
                             '/o/Profiles%2FPlaceHolder.jpg?alt=media&token=21990311-773c-41ad-9949-c4a34812db2a';
    blankPerson.socialMedia = JSON.stringify(new SocialMedia);
    blankPerson.projects = JSON.stringify([new Project]);
    blankPerson.awards = JSON.stringify([new Award]);
    blankPerson.publications = JSON.stringify([]);
    const newPerson = Object.assign({}, blankPerson);
    this.CRUD.uploadItem(newPerson, 'people').then(() => {
      this.message = 'Welcome to the Creanza Lab!';
      setTimeout(() => { this.message = undefined; }, 3000);
      this.newPersonForm = this.createNewForm();
    });
  }

  createNewForm() {
    const Year = formatDate(new Date, 'yyyy', 'en');
    return this.fb.group({
    email: ['', Validators.required],
    name: ['', Validators.required],
    description: ['Undergraduate Student', Validators.required],
    startYear: Year,
    endingYear: 'Present'
    });
  }


}
