import { Component, Input, OnInit } from '@angular/core';
import { GridBlowUpService } from '../grid-blow-up.service';
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  link: string = 'https://firebasestorage.googleapis.com/v0/b/creanza-lab-208216.appspot.com' +
                 '/o/Profiles%2FParker%20Rundstrom.JPG?alt=media&token=a41f57d5-2afd-4c43-9f8f-44ad87530ce8';
  @Input() collect: any[] = [
    {Links: [this.link, this.link], Name: 'birb1'},
    {Links: [this.link, this.link], Name: 'birb2'},
  ];
  BlowUpVisible: Boolean;
  constructor(private gridBlowUpService: GridBlowUpService) {}

  ngOnInit () {
    this.gridBlowUpService.visible.subscribe(bool => this.BlowUpVisible = bool);
    this.gridBlowUpService.figureArray.next(this.collect);
  }

  onPick (index: number) {
    this.gridBlowUpService.visible.next(true);
    this.gridBlowUpService.index.next(index);
  }
}

