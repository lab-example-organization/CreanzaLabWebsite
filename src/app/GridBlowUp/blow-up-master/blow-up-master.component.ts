import { Component, OnInit }                from '@angular/core';
import { ActivatedRoute }                   from '@angular/router';

@Component({
  selector: 'app-blow-up-master',
  templateUrl: './blow-up-master.component.html'
})
export class BlowUpMasterComponent implements OnInit {

  linksList: any[];
  index: number;
  gridPath: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.gridPath = this.route.parent.snapshot.url.join('/');
    
    this.route.data.subscribe(data => {
      this.linksList = data.Links[0];
      this.index = this.linksList.findIndex(member => member.Name === data.Links[1])
    });  
  }

}