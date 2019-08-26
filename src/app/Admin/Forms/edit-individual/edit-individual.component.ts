import { Component, OnInit, Input } from '@angular/core';
import { SocialMedia } from 'src/app/Classes/socialMedia';
import { CRUDService } from '../crud.service';
import { FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-edit-individual',
  templateUrl: './edit-individual.component.html',
  styleUrls: ['./edit-individual.component.css']
})
export class EditIndividualComponent implements OnInit {

  @Input() OldInfo: any;
  sMTypes = Object.keys(new SocialMedia);
  individualForm = this.makeForm();
  message: string;
  
  constructor(private CRUD: CRUDService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.individualForm = this.CRUD.quickAssign(this.individualForm, this.OldInfo);
    
  }
  makeForm(){
    return this.fb.group({
      publicEmail: '',
      pubName: '',
      cvresume: '',
      socialMedia:  this.populateSocialMedia(),//this.fb.array([this.fb.group({name: ''})]),
      projects: this.fb.array([this.fb.group({title: '', mainInfo: ''})])      
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

  populateSocialMedia(){
    let SocialMedia:FormArray = new FormArray([]);
    for(let type of this.sMTypes){
      SocialMedia.push( this.fb.group({[type]: ''}) );
    }
    return SocialMedia;
  }

  onSubmit(){
    this.message = "Processing Data"
    let results = Object.assign({}, this.individualForm.value);
    console.log(results)
  }

}
