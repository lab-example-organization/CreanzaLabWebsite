import { Component, OnInit } from '@angular/core';
import { Research } from '../Classes/research';
import { ResearchService } from './research.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {

  research$: Observable<Research[]>;
  constructor(private researchserv: ResearchService) { }

  ngOnInit() {
    this.research$ = this.researchserv.getResearch();
  }

}
