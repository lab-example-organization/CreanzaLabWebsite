import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { SocialMedia } from 'src/app/Classes/socialMedia';
import { CRUDService } from '../crud.service';
import { FormBuilder, FormArray, Form } from '@angular/forms';
import { Award, Project } from 'src/app/Classes/person';

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
  awardsArray = this.fb.array([]);
  projectsArray = this.fb.array([]);
  individualForm = this.makeForm();

  fileEvent: any;
  @ViewChild('file') fileValue: ElementRef;

  constructor(private CRUD: CRUDService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.individualForm = this.CRUD.quickAssign(this.individualForm, this.OldInfo);
    this.individualForm.controls.socialMedia = this.populateSocialMedia();
    const awards = <Award[]>JSON.parse(this.OldInfo.awards);
    awards.forEach(award => this.addAward(true, award.title, award.yearReceived));
    const projects = <Project[]>JSON.parse(this.OldInfo.projects);
    projects.forEach(project => this.addProject(true, project.title, project.mainInfo));
  }
    makeForm(){
    return this.fb.group({
      publicEmail: '',
      pubName: '',
      cvresume: '',
      socialMedia: this.socialMediaArray,//this.populateNewSocialMedia(),//this.fb.array([this.fb.group({name: ''})]),
      projects: this.projectsArray,
      awards: this.awardsArray
    })

  }
  
  addProject(add: boolean, title: string= '', mainInfo: string = '') {
    if (add) {
      this.projectsArray.push(this.fb.group({title: title, mainInfo: mainInfo}));
    } else {
      this.projectsArray.removeAt(this.projectsArray.length - 1);
    }
  }

  addAward(add: boolean, title: string= '', yearReceived: string = '') {
    if (add) {
      this.awardsArray.push(this.fb.group({title: title, yearReceived: yearReceived}));
    } else {
      this.awardsArray.removeAt(this.awardsArray.length - 1);
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
    const editedInfo = this.OldInfo;
    Object.keys(this.individualForm.controls).forEach(key => {
      editedInfo[key] = this.individualForm.controls[key].value;
    });
    editedInfo.awards = this.format(this.awardsArray);
    editedInfo.projects = this.format(this.projectsArray);
    editedInfo.socialMedia = this.formatSM(editedInfo);
    console.log(editedInfo);
     return this.CRUD.editImages([`CVs/${this.OldInfo.name}`], [this.fileEvent], [this.OldInfo.cvresume])
     .then(link => {
       editedInfo.cvresume = link[0];
       return this.CRUD.editItem(editedInfo, 'people', this.OldInfo.key);
     }).then(() => {
       this.message = 'submission successful!';
       this.onReset();
     });
  }
  
  onReset() {
    this.fileEvent = undefined;
    this.fileValue.nativeElement.value = '';
  }

  onFile(event: any) {
    this.fileEvent = event;
  }

  format(formArray: FormArray){
    let JSONed: any[] = [];
    formArray.value.forEach(element => JSONed.push(element));
    return(JSON.stringify(JSONed));
  }

  formatSM(data: any){
    let JSONed: any[] = [];
    data.socialMedia.forEach(element => {
      const values = <string[]>Object.values(element);
        JSONed.push({[values[0]]: values[1]});
      });
    return(JSON.stringify(JSONed));
  }

}
