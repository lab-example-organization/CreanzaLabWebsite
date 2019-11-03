import { Component, OnInit, Input } from '@angular/core';
import { Publication } from '../Classes/publication';

@Component({
  selector: 'app-display-pubs',
  templateUrl: './display-pubs.component.html',
  styleUrls: ['./display-pubs.component.css']
})
export class DisplayPubsComponent implements OnInit {

  constructor() { }
  
  @Input() mainAuthor: RegExp
  @Input() publications: Publication[];
  @Input() subAuthors: RegExp[] = [];
  
  ngOnInit() {
  }

  checkFormat(author:string){
    for(let reg of this.subAuthors){
      if(reg.test(author)){
        return('underline');
      }
    }
  return('none');
  }
}
