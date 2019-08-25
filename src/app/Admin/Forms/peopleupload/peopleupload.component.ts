import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { CRUDService } from '../crud.service';
import { AuthService } from '../../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-peopleupload',
  templateUrl: './peopleupload.component.html',
  styleUrls: ['./peopleupload.component.css']
})
export class PeopleuploadComponent implements OnInit, OnDestroy {

  @Input() existingPerson;
  positions: string[] = ['High-schooler', 'Undergraduate Student', 'Graduate Student', 'Post-Doc', 'PI', 'Alumni', 'Rotation Student'];
  personForm = this.createForm();
  imageEvent: any;
  @ViewChild('image') imageValue: ElementRef;
  message: string;
  OldInfo: any;

  stream: Subscription;

  constructor(private fb: FormBuilder,
              private CRUD: CRUDService,
              private auth: AuthService) { }

  ngOnInit() {
    this.stream = this.auth.user.subscribe(user => {
      this.CRUD.fetchIndivdualData(user, 'people').subscribe(u => {
        this.OldInfo = u;
        this.personForm = this.CRUD.quickAssign(this.personForm, u);
      });
    });
  }

  ngOnDestroy() {
    this.stream.unsubscribe();
  }

  createForm() {
    const Year = formatDate(new Date, 'yyyy', 'en');
    return this.fb.group({
      description: ['Undergraduate', Validators.required],
      endingYear: ['Present', Validators.required],
      name: ['', Validators.required],
      projectShort: '',
      startYear: [Year, Validators.required],
      studying: ['', Validators.required],
      pronouns: '',
      portraitLink: ''
    });
  }

  onFile(event: any) {
    this.imageEvent = event;
  }

  onSubmit() {
    this.message = 'processing';
    const editedInfo = this.OldInfo;
    Object.keys(this.personForm.controls).forEach(key => {
      editedInfo[key] = this.personForm.controls[key].value;
    });
    return this.CRUD.editImages([`Profiles/${editedInfo.name}`], [this.imageEvent], [this.OldInfo.portraitLink])
    .then(link => {
      editedInfo.portraitLink = link[0];
      return this.CRUD.editItem(editedInfo, 'people', this.OldInfo.key);
    }).then(() => {
      this.message = 'submission successful!';
      this.onReset();
    });
  }

  onReset() {
    this.imageEvent = undefined;
    this.imageValue.nativeElement.value = '';
  }
}
