import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { formatDate } from '@angular/common';
import { FirebaseService } from '../GlobalServices/firebase.service';
import { Person } from '../Classes/person';

@Component({
  selector: 'app-peopleupload',
  templateUrl: './peopleupload.component.html',
  styleUrls: ['./peopleupload.component.css']
})
export class PeopleuploadComponent implements OnInit {

  positions: string[] = ['High-schooler', 'Undergraduate', 'Graduate', 'Post-Doc', 'PI'];
  personForm = this.createForm();
  imageEvent: any;
  @ViewChild('image') imageValue: ElementRef;

  constructor(private fb: FormBuilder,
              private firebaseserv: FirebaseService) { }

  ngOnInit() {
  }
  createForm() {
    const Year = formatDate(new Date, 'yyyy', 'en');
    return this.fb.group({
      description: 'Undergraduate',
      endingYear: 'Present',
      name: '',
      project: '',
      startYear: Year,
      studying: '',
      pronouns: '',
      portraitLink: ''
    });
  }

  onFile(event: any) {
    this.imageEvent = event;
  }

  onSubmit() {
    const newPerson: Person = Object.assign({}, this.personForm.value);
    return this.firebaseserv.uploadImage(`Profiles/${newPerson.name}`, this.imageEvent)
    .then(() => {
      return this.firebaseserv.returnImage(`Profiles/${newPerson.name}`).toPromise();
    }).then(link => {
      newPerson.portraitLink = link;
      return this.firebaseserv.uploadDocument(newPerson, 'people');
    }).then(() => this.onReset());
  }

  onReset() {
    this.personForm = this.createForm();
    this.imageEvent = undefined;
    this.imageValue.nativeElement.value = '';
  }
}
