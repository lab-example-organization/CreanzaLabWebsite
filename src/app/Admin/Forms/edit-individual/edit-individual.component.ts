import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy, OnChanges } from '@angular/core';
import { SocialMedia } from 'src/app/Classes/socialMedia';
import { CRUDService } from '../crud.service';
import { FormBuilder, FormArray, Form } from '@angular/forms';
import { Award, Project } from 'src/app/Classes/person';
import { PublicationService } from '../publicationupload/publication.service';
import { Publication } from 'src/app/Classes/publication';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-individual',
  templateUrl: './edit-individual.component.html',
  styleUrls: ['./edit-individual.component.css']
})
export class EditIndividualComponent implements OnInit, OnDestroy, OnChanges {

  @Input() OldInfo: any;
  @Input() Key: string;
  sMTypes = Object.keys(new SocialMedia);
  message: string;
  
  socialMediaArray = this.populateNewSocialMedia();
  awardsArray = this.fb.array([]);
  projectsArray = this.fb.array([]);
  individualForm = this.makeForm();
  publicationsArray: Publication[];
  subscribe: Subscription;
  disable: boolean

  cvresumeTitle: string;
  fileEvent: any;
  @ViewChild('file') fileValue: ElementRef;

  constructor(private CRUD: CRUDService,
              private fb: FormBuilder,
              private pubsserv: PublicationService) { }

  ngOnInit() {
    this.subscribe = this.pubsserv.publicationList
                      .subscribe(pubs => this.publicationsArray = pubs);
  }

  ngOnChanges(){
    if(!this.Key){
      this.individualForm.disable()
      this.disable = true;
    }else{
      this.individualForm.enable();
      this.disable = false;
    }
    this.populateForm();
  }

  ngOnDestroy(){
    this.subscribe.unsubscribe();
  }

  makeForm(){
    return this.fb.group({
      publicEmail: '',
      pubName: '',
      cvresume: '',
      about: '',
      website: '',
      department: '',
      github: '',
      cvresumeTitle: this.cvresumeTitle,
      socialMedia: this.socialMediaArray,
      projects: this.projectsArray,
      awards: this.awardsArray
    })

  }

  populateForm(){
    this.socialMediaArray = this.populateNewSocialMedia();
    this.awardsArray = this.fb.array([]);
    this.projectsArray = this.fb.array([]);
    this.individualForm = this.makeForm();
    this.pubsserv.assignMaster(JSON.parse(this.OldInfo.publications));
    this.individualForm = this.CRUD.quickAssign(this.individualForm, this.OldInfo);
    this.individualForm.controls.socialMedia = this.populateSocialMedia();
    const awards = <Award[]>JSON.parse(this.OldInfo.awards);
    awards.forEach(award => this.addAward(true, award.title, award.yearReceived));
    const projects = <Project[]>JSON.parse(this.OldInfo.projects);
    projects.forEach(project => this.addProject(true, project.title, project.mainInfo, project.githubLink));
    this.cvresumeTitle = this.OldInfo.cvresumeTitle;
  }
  
  addProject(add: boolean, title: string= '', mainInfo: string = '', githubLink: string = '') {
    if (add) {
      this.projectsArray.push(this.fb.group({title: title, mainInfo: mainInfo, githubLink: githubLink}));
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
    editedInfo.publications = this.formatPubs();
    editedInfo.cvresumeTitle = this.cvresumeTitle;
     return this.CRUD.editImages([`CVs/${this.cvresumeTitle}`], [this.fileEvent], [this.OldInfo.cvresume])
     .then(link => {
       editedInfo.cvresume = link[0];
       return this.CRUD.editItem(editedInfo, 'people', this.Key);
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
    const filePath = event.target.value;
    this.cvresumeTitle = filePath.substr(filePath.lastIndexOf('\\') + 1);
  }

  format(formArray: FormArray){
    let JSONed: any[] = [];
    formArray.value.forEach(element => JSONed.push(element));
    return JSON.stringify(JSONed);
  }

  formatSM(data: any){
    let Blank = new SocialMedia;
    data.socialMedia.forEach(element => {
      const values = <string[]>Object.values(element);
      Blank[values[0]] = values[1]
    });
    return JSON.stringify(Blank);
  }

  formatPubs(){
    let pubArray = JSON.stringify(this.publicationsArray)
    if(pubArray === "[{}]"){
      pubArray = "[]";
    }
    return pubArray;
  }

}
