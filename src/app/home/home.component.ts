import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  run:boolean = false;
  images$:Observable<string[]>

  constructor(private homeserv: HomeService) { }

  ngOnInit() {
    this.images$ = this.homeserv.getImages();
  }

  onStop(){
    this.run = true;
    console.log("triggered")
  }
}
