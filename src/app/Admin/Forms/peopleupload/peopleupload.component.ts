import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { CRUDService } from '../crud.service';
import { Person } from 'src/app/Classes/person';

@Component({
  selector: 'app-peopleupload',
  templateUrl: './peopleupload.component.html',
  styleUrls: ['./peopleupload.component.css']
})
export class PeopleuploadComponent implements OnChanges {

  @Input() OldInfo: Person;
  @Input() Key: string;
  positions: string[] = ['High-schooler', 'Undergraduate Student', 'Graduate Student', 'Post-Doc', 'PI', 'Alumni', 'Rotation Student'];
  personForm = this.createForm();
  imageEvent: any;
  @ViewChild('image') imageValue: ElementRef;
  message: string;

  constructor(private fb: FormBuilder,
              private CRUD: CRUDService) { }


  ngOnChanges(){
    if(!this.Key){
      this.personForm.disable();
    }else{
      this.personForm.enable();
    }
    this.personForm = this.CRUD.quickAssign(this.personForm, this.OldInfo);
  }

  createForm() {
    const Year = formatDate(new Date, 'yyyy', 'en');
    return this.fb.group({
      description: ['Undergraduate', Validators.required],
      endingYear: ['Present', Validators.required],
      name: ['', Validators.required],
      projectShort: '',
      startYear: [Year, Validators.required],
      studying: '',
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
    let oldLink = this.OldInfo.portraitLink
    if(oldLink === 'https://firebasestorage.googleapis.com/v0/b/creanza-lab-208216.appspot.com'+
    '/o/Profiles%2FIMG_20170622_142410.jpg?alt=media&token=e7b71794-442e-4869-910a-7cf81d3f00a7'){
      oldLink = ''
    }
    return this.CRUD.editImages([`Profiles/${editedInfo.name}`], [this.imageEvent], [oldLink])
    .then(link => {
      editedInfo.portraitLink = link[0];
      return this.CRUD.editItem(editedInfo, 'people', this.Key);
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
