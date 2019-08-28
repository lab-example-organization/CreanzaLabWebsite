import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CRUDService } from '../Forms/crud.service';
import { LabPhoto } from 'src/app/Classes/labPhoto';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.css']
})
export class UploadPhotoComponent implements OnInit {

  uploadPhotos$: Observable<LabPhoto>;
  uploadPhotosForm: FormGroup;
  message: string;
  eventdata: any;
  downloadPhotos$: Observable<LabPhoto[]>;
  photovariable: string;
  @ViewChild('link') link: ElementRef;
  @ViewChild('reset') reset: HTMLSelectElement;

  constructor(private fb: FormBuilder,
              private CRUD: CRUDService) { }

  ngOnInit() {
    this.uploadPhotosForm = this.createForm();
    this.downloadPhotos$ = this.CRUD.fetchAllData('groupPhotos');
  }

  onFile(event: any) {
    this.eventdata = event;
    this.uploadPhotosForm.patchValue({link: 'stufforsomehting'});
  }

  onSubmit() {
    const newPhoto = Object.assign({}, this.uploadPhotosForm.value);
    this.CRUD.uploadImages([`groupPhotos/${newPhoto.date}${newPhoto.name}`],
      [this.eventdata]).then(url => {
        newPhoto.link = url[0];
        this.CRUD.uploadItem(newPhoto, 'groupPhotos');
      }).then(() => {this.message = 'Success!'; this.onReset(); });
  }

  onUpdate() {
    const newPhoto = Object.assign({}, this.uploadPhotosForm.value);
    this.CRUD.editImages([`groupPhotos/${newPhoto.date}${newPhoto.name}`],
                          [this.eventdata], [newPhoto.link]).then(link => {
                            newPhoto.link = link[0];
                            return this.CRUD.editItem(newPhoto, 'groupPhotos', this.photovariable);
                          }).then(() => {
                            this.message = 'submission successful!';
                            this.onReset();
                          });
  }
  onNameChange(thisevent: string) {
    if(thisevent === "New Photo"){
      delete this.photovariable;
      this.uploadPhotosForm = this.createForm();
    }else{
      this.CRUD.fetchTargetData(thisevent, 'name', 'groupPhotos').subscribe(photodata => {
        this.uploadPhotosForm = this.CRUD.quickAssign(this.uploadPhotosForm, photodata);
        this.photovariable = photodata.key;
      }).unsubscribe;
    }
  }

  onDelete() {
    this.CRUD.deleteItem( [ this.uploadPhotosForm.controls.link.value],
      'groupPhotos', this.photovariable)
      .then(() => { this.message = 'Delete successful'; this.onReset(); } );
  }

  onReset() {
    this.eventdata = undefined;
    this.link.nativeElement.value = '';
    this.uploadPhotosForm = this.createForm();
    this.photovariable = undefined;
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

