import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { CRUDService } from '../Forms/crud.service';
//import { UploadPhoto } from '../Classes/UploadPhoto';
//might need to make a new file
//import { PeopleService} from './people.service';
//import { Observable } from 'rxjs';


@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.css']
})
export class UploadPhotoComponent implements OnInit {

  UploadPhotosForm = this.createForm();
  message: string;
  @ViewChild('link') link:ElementRef;
  eventdata: any;

  constructor(private fb: FormBuilder,
              private CRUD: CRUDService) { }

  ngOnInit() {
  }

  onFile(event:any) {
    this.eventdata = event
  }
  onSubmit() {


    let newPhoto = Object.assign({}, this.UploadPhotosForm.value);
    console.log(newPhoto);
    this.CRUD.uploadImages([`groupPhotos/${newPhoto.date}${newPhoto.name}`],
      [this.eventdata]).then(url=>{
        newPhoto.link = url[0]
        this.CRUD.uploadItem(newPhoto, 'groupPhotos')

      })
    .then(() => this.message = "Success!")

  }

  createForm() {
    return this.fb.group({
    name: ['', Validators.required],
    date: ['', Validators.required],
    caption: ['', Validators.required],
    link: ['', Validators.required]
    })
  }
}

