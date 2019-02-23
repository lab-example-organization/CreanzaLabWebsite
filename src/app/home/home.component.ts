import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  run:boolean = false;
  Images:string[] =['https://cdn-images-1.medium.com/max/635/1*Iz4mA5OocyWB59yjx-nPEw.jpeg',
  'https://media.wired.com/photos/5a55457ef41e4c2cd9ee6cb5/master/w_2400,c_limit/Doggo-TopArt-104685145.jpg',
  'https://cdn-images-1.medium.com/max/635/1*Iz4mA5OocyWB59yjx-nPEw.jpeg']
  constructor() { }

  ngOnInit() {
  }

  onStop(){
    this.run = true;
    console.log("triggered")
  }
}
