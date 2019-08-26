import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { CRUDService } from '../crud.service';
import { PublicationService } from './publication.service';
import { Publication } from 'src/app/Classes/publication';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-publicationupload',
  templateUrl: './publicationupload.component.html',
  styleUrls: ['./publicationupload.component.css']
})
export class PublicationuploadComponent implements OnInit, OnDestroy {

  pubsList: Publication[];
  publicationForm = this.createForm();
  message: string;
  subscription: Subscription;

  constructor(private fb: FormBuilder,
              private pubserv: PublicationService) { }

  ngOnInit() {
    this.subscription = this.pubserv.publicationList
                        .subscribe(pubs => this.pubsList=pubs);
  }

  ngOnDestroy(){
    console.log(this.pubsList);
    this.subscription.unsubscribe();
  }

  onSubmit() {
    const newPublications = Object.assign({}, this.publicationForm.value);
    newPublications.authors = this.formatAuthors(newPublications.authors);
    this.pubserv.Action(newPublications, 'submit')
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
