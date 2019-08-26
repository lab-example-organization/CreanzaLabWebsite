import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../Forms/publicationupload/publication.service';

@Component({
  selector: 'app-edit-publications',
  templateUrl: './edit-publications.component.html',
  styleUrls: ['./edit-publications.component.css']
})
export class EditPublicationsComponent implements OnInit {

  constructor(private pubserv: PublicationService) { }

  ngOnInit() {
    this.pubserv.fetchMaster();
  }

}
