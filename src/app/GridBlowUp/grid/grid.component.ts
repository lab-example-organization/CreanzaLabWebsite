import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent {

  @Input() collect: any[] = [{Links:["https://firebasestorage.googleapis.com/v0/b/creanza-lab-208216.appspot.com/o/Profiles%2FParker%20Rundstrom.JPG?alt=media&token=a41f57d5-2afd-4c43-9f8f-44ad87530ce8", "https://firebasestorage.googleapis.com/v0/b/creanza-lab-208216.appspot.com/o/Profiles%2FParker%20Rundstrom.JPG?alt=media&token=a41f57d5-2afd-4c43-9f8f-44ad87530ce8"], Name:"birb1"},
                            {Links:["https://firebasestorage.googleapis.com/v0/b/creanza-lab-208216.appspot.com/o/Profiles%2FParker%20Rundstrom.JPG?alt=media&token=a41f57d5-2afd-4c43-9f8f-44ad87530ce8", "https://firebasestorage.googleapis.com/v0/b/creanza-lab-208216.appspot.com/o/Profiles%2FParker%20Rundstrom.JPG?alt=media&token=a41f57d5-2afd-4c43-9f8f-44ad87530ce8"], Name:"birb2"}];
  
}
