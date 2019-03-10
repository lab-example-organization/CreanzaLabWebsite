import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CRUDService } from '../Forms/crud.service';
import { UploadPhoto } from 'src/app/Classes/uploadPhoto';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.css']
})
export class UploadPhotoComponent implements OnInit {
  uploadPhotos$: Observable<UploadPhoto>;
  uploadPhotosForm: FormGroup;
  message: string;
  eventdata: any;
  @ViewChild('link') link: ElementRef;

  constructor(private fb: FormBuilder,
              private CRUD: CRUDService) { }

  ngOnInit() {
    this.uploadPhotosForm = this.createForm();
  }

  onFile(event: any) {
    this.eventdata = event;
  }

  onSubmit() {
    const newPhoto = Object.assign({}, this.uploadPhotosForm.value);
    console.log(newPhoto);
    this.CRUD.uploadImages([`groupPhotos/${newPhoto.date}${newPhoto.name}`],
      [this.eventdata]).then(url => {
        newPhoto.link = url[0];
        this.CRUD.uploadItem(newPhoto, 'groupPhotos');
      }).then(() => this.message = 'Success!');
  }

  createForm() {
    return this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      caption: ['', Validators.required],
      link: ['', Validators.required]
    });
  }
}

