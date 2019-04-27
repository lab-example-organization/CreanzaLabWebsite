import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CRUDService } from '../Forms/crud.service';
import { UploadPhoto } from 'src/app/Classes/uploadPhoto';
import { Observable, of } from 'rxjs';

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
  downloadPhotos$: Observable<UploadPhoto[]>;
  photovariable: string;
  @ViewChild('link') link: ElementRef;

  constructor(private fb: FormBuilder,
              private CRUD: CRUDService) { }

  ngOnInit() {
    this.uploadPhotosForm = this.createForm();
    this.downloadPhotos$ = this.CRUD.fetchAllData('groupPhotos')
    // this.downloadPhotos$ = of([{name: "Fake_pic", 
    //                             date: "11/23/19", 
    //                             caption: "this is a test", 
    //                             link: "thisidjsopk//"}])

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

  onUpdate() {
    const newPhoto = Object.assign({}, this.uploadPhotosForm.value);
    console.log(newPhoto);
    this.CRUD.editImages([`groupPhotos/${newPhoto.date}${newPhoto.name}`], 
                          [this.eventdata], [newPhoto.link]).then(link => {
                            newPhoto.link = link[0];
                            return this.CRUD.editItem(newPhoto, 'groupPhotos', this.photovariable);
                          }).then(() => {
                            this.message = 'submission successful!';
                            // this.onReset();
                          });
    

  }
  
  onNameChange(thisevent: any){
    console.log(thisevent);
    this.CRUD.fetchTargetData(thisevent,'name','groupPhotos').subscribe(photodata => 
      
    {this.uploadPhotosForm = this.CRUD.quickAssign(this.uploadPhotosForm, photodata); 
      this.photovariable = photodata.key
    }
    
    )
    console.log(this.uploadPhotosForm.value)
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

