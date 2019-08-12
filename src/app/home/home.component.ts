import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UploadPhoto } from '../Classes/uploadPhoto';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  images$: Observable<UploadPhoto[]>;

  constructor(private homeserv: HomeService) { }

  ngOnInit() {
    this.images$ = this.homeserv.getImages().pipe(
      map(photos => photos.sort((a,b) => a.date > b.date ? -1 : 1))
    );
  }

}