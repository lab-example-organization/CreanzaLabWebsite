import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CRUDService } from '../Forms/crud.service';
import { Research } from '../../Classes/research';
import { FigureImage } from '../../Classes/figureImage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-edit-research',
  templateUrl: './edit-research.component.html',
  styleUrls: ['./edit-research.component.css']
})
export class EditResearchComponent implements OnInit, OnDestroy {

  messageTop: string;
  messageBottom: string;
  figures: FigureImage[];
  pageForm: FormGroup = this.MakeForm();
  imageEvent: any;
  edit = false;
  editIndex: number;
  @ViewChild('image') imageValue: ElementRef;
  subscribeResearch: Subscription;
  subscribeContact: Subscription;
  type = 'research';
  research: string;
  contact: string;

  constructor(private CRUD: CRUDService,
              private fb: FormBuilder,
              public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.subscribeResearch = this.CRUD.fetchAllData('research')
      .subscribe(research => {
        this.figures = JSON.parse(research[0].figures);
        this.research = research[0].mainText;
        this.pageForm = this.MakeForm(this.research);
      });
      this.subscribeContact = this.CRUD.fetchAllData('contact')
        .subscribe(contact => this.contact = contact[0].mainText);
  }
  
  ngOnDestroy(){
    this.subscribeResearch.unsubscribe();
    this.subscribeContact.unsubscribe();
  }
  
  onSubmit(fig: boolean) {
    if (fig) {
      if (this.edit) {
        this.messageBottom = 'Processing Data...';
          this.CRUD.editImages([`ResearchPhotos/${this.pageForm.controls.Title.value}`],
                               [this.imageEvent],
                               [this.figures[this.editIndex].Link])
            .then(link =>  {
              this.figures[this.editIndex].Link = link[0];
              this.figures[this.editIndex].Name = this.pageForm.controls.Title.value,
              this.figures[this.editIndex].Description = this.pageForm.controls.Description.value;

              const UploadResearch: Research = {mainText: this.pageForm.controls.MainText.value,
                                                figures: JSON.stringify(this.figures)};
              this.CRUD.editItem(UploadResearch, 'research', 'Research').then(() => {
              this.onReset();
              this.messageBottom = 'Submitted!';
              setTimeout(() => { this.messageBottom = undefined; }, 3000);
              } ); } );
      } else {
          this.messageBottom = 'Processing Data...';
          this.CRUD.uploadImages([`ResearchPhotos/${this.pageForm.controls.Title.value}`],
          [this.imageEvent])
          .then(link =>  {const NewFigure: FigureImage = {Link: link[0],
                                                          Name: this.pageForm.controls.Title.value,
                                                          Description: this.pageForm.controls.Description.value};
                this.figures[this.figures.length] = NewFigure;
                const UploadResearch: Research = {mainText: this.pageForm.controls.MainText.value,
                                                  figures: JSON.stringify(this.figures)};
                this.CRUD.editItem(UploadResearch, 'research', 'Research').then(() => {
                  this.onReset();
                  this.messageBottom = 'Submitted!';
                  setTimeout(() => { this.messageBottom = undefined; }, 3000);
              } );
          } );
      }
    } else {
      this.messageTop = 'Processing Data...';
      let Upload: any
      if(this.type === 'research'){
        Upload = {mainText: this.pageForm.controls.MainText.value,
          figures: JSON.stringify(this.figures)};
      }else{
        Upload = {mainText: this.pageForm.controls.MainText.value}
      }

      this.CRUD.editItem(Upload, this.type, this.type)
      .then(() => {
        this.messageTop = 'Submitted!';
        setTimeout(() => { this.messageTop = undefined; }, 3000);
      });
    }
  }

  MakeForm(maintext: string = '') {
    return this.fb.group({
      MainText: [maintext],
      Title: ['', Validators.required],
      Description: ['', Validators.required],
      Image: ['', Validators.required]
    });
  }

  onFile(event: any) {
    this.imageEvent = event;
    this.pageForm.patchValue({Image: true});
  }

  onNameChange(figIndex: number) {
    if (figIndex > -1) {
      this.pageForm.patchValue({Title: this.figures[figIndex].Name,
                                    Description: this.figures[figIndex].Description,
                                    Image: this.figures[figIndex].Link});
      this.imageEvent = undefined;
      this.edit = true;
      this.editIndex = figIndex;
    } else {
      this.pageForm.patchValue({Title: '',
                                    Description: '',
                                    Image: ''});
      this.edit = false;
      this.onReset();
    }
  }

  onReset() {
    this.imageValue.nativeElement.value = '';
    this.imageEvent = undefined;
  }

  onDelete() {
    this.messageBottom = 'Deleting...';
    this.CRUD.removeOldImage(this.figures[this.editIndex].Link);
    this.figures.splice(this.editIndex, 1);
    const UploadResearch: Research = {mainText: this.pageForm.controls.MainText.value,
                                      figures: JSON.stringify(this.figures)};
    this.CRUD.editItem(UploadResearch, 'research', 'Research')
      .then(() => {
        this.messageBottom = 'Deleted!';
        setTimeout(() => { this.messageBottom = undefined; }, 3000);
      });
  }

  onTypeChoice(research: boolean){
    if (research) {
      this.type = 'research';
      this.pageForm.patchValue({MainText: this.research});
    } else {
      this.type = 'contact';
      this.pageForm.patchValue({MainText: this.contact});
    }
  }

}
