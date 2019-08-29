import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { GridBlowUpService } from '../grid-blow-up.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit,OnDestroy {

  link: string = 'https://firebasestorage.googleapis.com/v0/b/creanza-lab-208216.appspot.com' +
                 '/o/Profiles%2FParker%20Rundstrom.JPG?alt=media&token=a41f57d5-2afd-4c43-9f8f-44ad87530ce8';
  @Input() collect: any[] = [
    {Link: this.link, Name: 'birb1', Description: 'LOL!'},
    {Link: this.link, Name: 'birb2', Description: 'LOLER!'}
  ];
  BlowUpVisible: Boolean;
  subscribe: Subscription;

  constructor(private gridBlowUpService: GridBlowUpService) {}

  ngOnInit () {
    this.subscribe = this.gridBlowUpService.visible.subscribe(bool => this.BlowUpVisible = bool);
    this.gridBlowUpService.figureArray.next(this.collect);
  }

  ngOnDestroy(){
    this.subscribe.unsubscribe();
  }

  onPick (index: number) {
    this.gridBlowUpService.visible.next(true);
    this.gridBlowUpService.index.next(index);
  }
}

