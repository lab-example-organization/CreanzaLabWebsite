import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { CRUDService } from '../Forms/crud.service';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.css']
})
export class EditCardComponent implements OnInit, OnDestroy {

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
