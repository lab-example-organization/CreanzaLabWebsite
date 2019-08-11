import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CRUDService } from '../Forms/crud.service';
import { Research } from '../../Classes/research';
import { FigureImage } from '../../Classes/figureImage';
import { tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-research',
  templateUrl: './edit-research.component.html',
  styleUrls: ['./edit-research.component.css']
})
export class EditResearchComponent implements OnInit {

  // ResearchText = 'lewl';
  MessageTop: string;
  MessageBottom: string;
  Figures: FigureImage[];
  ResearchForm: FormGroup = this.MakeForm();
  imageEvent: any;
  edit = false;
  editIndex: number;
  @ViewChild('image') imageValue: ElementRef;

  constructor(private CRUD: CRUDService,
              private fb: FormBuilder) { }

  ngOnInit() {
    console.log('start');
    this.CRUD.fetchAllData('research').subscribe
      (x => {
        this.Figures = JSON.parse(x[0].figures);
        this.ResearchForm = this.MakeForm(x[0].mainText);
      });
  }
  SubmitResearch(fig: boolean) {
    if (fig) {
      if (this.edit) {
        this.MessageBottom = 'Editing...';
          this.CRUD.editImages([`ResearchPhotos/${this.ResearchForm.controls.Title.value}`],
                               [this.imageEvent],
                               [this.Figures[this.editIndex].Link])
            .then(link =>  {
              this.MessageBottom = 'Submitting...';
              this.Figures[this.editIndex].Link = link[0];
              this.Figures[this.editIndex].Name = this.ResearchForm.controls.Title.value,
              this.Figures[this.editIndex].Description = this.ResearchForm.controls.Description.value;

              const UploadResearch: Research = {mainText: this.ResearchForm.controls.MainText.value,
                    figures: JSON.stringify(this.Figures)};
              this.CRUD.editItem(UploadResearch, 'research', 'Research').then(() => {
              this.onReset();
              this.MessageBottom = 'Submitted!';
              setTimeout(() => { this.MessageBottom = undefined; }, 3000);
              } ); } );
      } else {
            this.MessageBottom = 'Submitting...';
            this.CRUD.uploadImages([`ResearchPhotos/${this.ResearchForm.controls.Title.value}`],
            [this.imageEvent])
            .then(link =>  {const NewFigure: FigureImage = {Link: link[0],
                                                            Name: this.ResearchForm.controls.Title.value,
                                                            Description: this.ResearchForm.controls.Description.value};
                  this.Figures[this.Figures.length] = NewFigure;
                  const UploadResearch: Research = {mainText: this.ResearchForm.controls.MainText.value,
                                                    figures: JSON.stringify(this.Figures)};
                  this.CRUD.editItem(UploadResearch, 'research', 'Research').then(() => {
                    this.onReset();
                    this.MessageBottom = 'Submitted!';
                    setTimeout(() => { this.MessageBottom = undefined; }, 3000);
        } ); } );
      }
    } else {
      this.MessageTop = 'Submitting...';
      const UploadResearch: Research = {mainText: this.ResearchForm.controls.MainText.value,
        figures: JSON.stringify(this.Figures)};
      this.CRUD.editItem(UploadResearch, 'research', 'Research')
      .then(() => {
        this.MessageTop = 'Submitted!';
        setTimeout(() => { this.MessageTop = undefined; }, 3000);
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
    this. ResearchForm.patchValue({Image: true});
  }

  onNameChange(figIndex: number) {
    if (figIndex > -1) {
      this.ResearchForm.patchValue({Title: this.Figures[figIndex].Name,
                                    Description: this.Figures[figIndex].Description,
                                    Image: true});
      this.imageEvent = undefined;
      this.edit = true;
      this.editIndex = figIndex;
    } else {
      this.ResearchForm.patchValue({Title: '',
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

  deleteResearch() {
    this.MessageBottom = 'Deleting...';
    this.CRUD.removeOldImage(this.Figures[this.editIndex].Link);
    this.Figures.splice(this.editIndex, 1);
    const UploadResearch: Research = {mainText: this.ResearchForm.controls.MainText.value,
                                      figures: JSON.stringify(this.Figures)};
    this.CRUD.editItem(UploadResearch, 'research', 'Research')
      .then(() => {
        this.MessageBottom = 'Deleted!';
        setTimeout(() => { this.MessageBottom = undefined; }, 3000);
      });
  }

}
