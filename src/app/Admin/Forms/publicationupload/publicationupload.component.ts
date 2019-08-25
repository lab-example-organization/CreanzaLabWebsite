import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { CRUDService } from '../crud.service';

@Component({
  selector: 'app-publicationupload',
  templateUrl: './publicationupload.component.html',
  styleUrls: ['./publicationupload.component.css']
})
export class PublicationuploadComponent implements OnInit {

  publicationForm = this.createForm();
  message: string;

  constructor(private fb: FormBuilder,
              private CRUD: CRUDService) { }

  ngOnInit() {
  }

  onSubmit() {
    const newPublications = Object.assign({}, this.publicationForm.value);
    newPublications.authors = this.formatAuthors(newPublications.authors);
    this.CRUD.uploadItem(newPublications, 'publications')
    .then(() => this.message = 'Success!');
  }

  formatAuthors(authors: any[]) {
    const finalAuthors: string[] = [];
    authors.forEach(author => {
      finalAuthors.push(author.name);
    });
    return finalAuthors;
  }
  addAuthor(add: boolean) {
    const authors = <FormArray>this.publicationForm.controls.authors;
    if (add) {
      authors.push(this.fb.group({name: ''}));
    } else {
      authors.removeAt(authors.length - 1);
    }
  }
  createForm() {
    return this.fb.group({
    authors: this.fb.array([this.fb.group({name: ''})]),
    year: ['', Validators.required],
    title: ['', Validators.required],
    journal: ['', Validators.required],
    doi: '',
    issue: '',
    volume: '',
    first_page: '',
    last_page: '',
    article_number: ''
    });
  }
}
