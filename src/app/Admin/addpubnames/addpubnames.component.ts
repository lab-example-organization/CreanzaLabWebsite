import { Component, OnInit } from '@angular/core';
import { PubnamesService } from './pubnames.service'
import { Subscription } from 'rxjs';
import { trainee } from 'src/app/Classes/trainee';
import { FormBuilder, Validators } from '@angular/forms';
import { CRUDService } from '../Forms/crud.service';
import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'app-addpubnames',
  templateUrl: './addpubnames.component.html',
  styleUrls: ['./addpubnames.component.css']
})
export class AddpubnamesComponent implements OnInit {

  subscription: Subscription;
  trainees: trainee[];
  traineeForm = this.makeForm();
  Message: string;
  deleteIndex: number;

  constructor(private pubnameserv: PubnamesService,
              private crud: CRUDService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.subscription = this.pubnameserv.getTrainees().subscribe(trainee => this.trainees = trainee);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  makeForm(){
    return this.fb.group({Trainee: ['', Validators.required]})
  }

  onSubmit(){
    const newTrainee = {name: this.traineeForm.controls.Trainee.value};
    this.crud.uploadItem(newTrainee, 'trainees')
    .then(() => {this.Message = "Submitted!";
    setTimeout(() => { this.Message = undefined; }, 3000);
                  this.traineeForm = this.makeForm();})
  }
  onDelete(){
    this.crud.deleteItem([], 'trainees', this.trainees[this.deleteIndex].key)
    .then(() => {this.Message = "Deleted!";
    setTimeout(() => { this.Message = undefined; }, 3000);
    });
  }
  onSwitchUser(index: number){
    this.deleteIndex = index
  }
}
