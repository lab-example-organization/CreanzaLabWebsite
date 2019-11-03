import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CRUDService } from '../Forms/crud.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit, OnDestroy {

  stream: Subscription;
  person: any;
  asyncReturn = false;

  constructor(private CRUD: CRUDService,
              private auth: AuthService) { }

  ngOnInit() {
    this.stream = this.auth.user.subscribe(user => {
      this.CRUD.fetchIndivdualData(user, 'people')
      .subscribe(u => { this.person = u;
                        this.asyncReturn = true;});
    });
  }

  ngOnDestroy() {
    this.stream.unsubscribe();
  }

}
