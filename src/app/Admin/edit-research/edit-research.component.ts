import { Component, OnInit } from '@angular/core';
import { CRUDService } from '../Forms/crud.service';
import { Research } from '../../Classes/research';
import { tap } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-research',
  templateUrl: './edit-research.component.html',
  styleUrls: ['./edit-research.component.css']
})
export class EditResearchComponent implements OnInit {

  // ResearchText = 'lewl';
  Message: string;
  Figures: Research[];
  ResearchForm: FormGroup = this.MakeForm();

  constructor(private CRUD: CRUDService,
              private fb: FormBuilder) { }

  ngOnInit() {
    console.log('start');
    this.CRUD.fetchAllData('research').subscribe
      (x => {
        this.Figures = JSON.parse(x[0].figures);
        this.ResearchForm.patchValue({MainText: x[0].mainText});
      });
  }
  SubmitResearch() {
    this.Message = 'Submiting...';
    const UploadResearch: Research = {mainText: this.ResearchForm.controls.MainText.value,
                                      figures: JSON.stringify(this.Figures)};
    this.CRUD.editItem(UploadResearch, 'research', 'Research')
      .then(() => this.Message = 'Submitted!');
  }
  MakeForm() {
    return this.fb.group({
      MainText: '',
      Figures: ''
    });
  }

}
