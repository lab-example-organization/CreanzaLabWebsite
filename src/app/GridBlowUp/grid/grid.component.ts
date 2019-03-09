import { Component, Input, OnInit } from '@angular/core';
import { GridBlowUpService } from '../grid-blow-up.service';
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  @Input() collect: any[] = [{Links:["https://firebasestorage.googleapis.com/v0/b/creanza-lab-208216.appspot.com/o/Profiles%2FParker%20Rundstrom.JPG?alt=media&token=a41f57d5-2afd-4c43-9f8f-44ad87530ce8", "https://firebasestorage.googleapis.com/v0/b/creanza-lab-208216.appspot.com/o/Profiles%2FParker%20Rundstrom.JPG?alt=media&token=a41f57d5-2afd-4c43-9f8f-44ad87530ce8"], Name:"birb1"},
                            {Links:["https://firebasestorage.googleapis.com/v0/b/creanza-lab-208216.appspot.com/o/Profiles%2FParker%20Rundstrom.JPG?alt=media&token=a41f57d5-2afd-4c43-9f8f-44ad87530ce8", "https://firebasestorage.googleapis.com/v0/b/creanza-lab-208216.appspot.com/o/Profiles%2FParker%20Rundstrom.JPG?alt=media&token=a41f57d5-2afd-4c43-9f8f-44ad87530ce8"], Name:"birb2"}];
  BlowUpVisible: Boolean;
  constructor(private GridBlowUpService: GridBlowUpService) {}

  ngOnInit () {
    this.GridBlowUpService.visible.subscribe(bool => this.BlowUpVisible = bool);
    this.GridBlowUpService.figureArray.next(this.collect);
  }

  onPick (index: number) {
    this.GridBlowUpService.visible.next(true);
    this.GridBlowUpService.index.next(index);
  }
}

