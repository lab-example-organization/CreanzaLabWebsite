import { Component, OnInit, Input } from '@angular/core';
import { SocialMedia } from 'src/app/Classes/socialMedia';
import { CRUDService } from '../crud.service';
import { FormBuilder, FormArray } from '@angular/forms';
import { Award } from 'src/app/Classes/person';

@Component({
  selector: 'app-edit-individual',
  templateUrl: './edit-individual.component.html',
  styleUrls: ['./edit-individual.component.css']
})
export class EditIndividualComponent implements OnInit {

  @Input() OldInfo: any;
  sMTypes = Object.keys(new SocialMedia);
  message: string;
  
  socialMediaArray: FormArray = this.populateNewSocialMedia();
  individualForm = this.makeForm();
  constructor(private CRUD: CRUDService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.individualForm = this.CRUD.quickAssign(this.individualForm, this.OldInfo);
    this.individualForm.controls.socialMedia = this.populateSocialMedia();
    //const awards = <Award[]>JSON.parse(this.OldInfo.awards);
    //awards.forEach(award => this.addAward(true, award.title, award.yearReceived));
  }
    makeForm(){
    return this.fb.group({
      publicEmail: '',
      pubName: '',
      cvresume: '',
      socialMedia: this.socialMediaArray,//this.populateNewSocialMedia(),//this.fb.array([this.fb.group({name: ''})]),
      projects: this.fb.array([this.fb.group({title: '', mainInfo: ''})]),
      awards: this.fb.array([this.fb.group({title: '', yearReceived: ''})])
    })

  }
  
  addProject(add: boolean) {
    const projects = <FormArray>this.individualForm.controls.projects;
    if (add) {
      projects.push(this.fb.group({title: '', mainInfo: ''}));
    } else {
      projects.removeAt(projects.length - 1);
    }
  }
  addAward(add: boolean, title: string= '', yearReceived: string = '') {
    const awards = <FormArray>this.individualForm.controls.awards;
    if (add) {
      awards.push(this.fb.group({title: title, yearReceived: yearReceived}));
    } else {
      awards.removeAt(awards.length - 1);
    }
  }

  populateNewSocialMedia(){
    let socialMedia:FormArray = new FormArray([]);
    for(let type of this.sMTypes){
      socialMedia.push( this.fb.group({media: type, link: ''}) );
    }
    return socialMedia;
  }

  populateSocialMedia(){
    const data = <SocialMedia>JSON.parse(this.OldInfo.socialMedia)
    let socialMedia:FormArray = new FormArray([]);
    for(let type of this.sMTypes){
      //if(data[type]){
        socialMedia.push( this.fb.group({media: type, link: data[type]}) );
      //}else{
      //  SocialMedia.push( this.fb.group({[type]: ''}) );
      //}
      
    }
    return socialMedia
  }

  onSubmit(){
    this.message = "Processing Data"
    let results = Object.assign({}, this.individualForm.value);
    console.log(results)
  }

}
