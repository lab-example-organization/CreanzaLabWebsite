import { Component, OnInit, OnDestroy } from '@angular/core';
import { Research } from '../Classes/research';
import { ResearchService } from './research.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit, OnDestroy {

  research$: Observable<Research>;
  gridData: any[];
  researchSub: Subscription;
  constructor(private researchserv: ResearchService) { }

  ngOnInit() {
    this.research$ = this.researchserv.getResearch();
    this.researchSub = this.research$.subscribe(x => this.gridData = JSON.parse(x.figures));
  }

  ngOnDestroy() {
    this.researchSub.unsubscribe();
  }

}
