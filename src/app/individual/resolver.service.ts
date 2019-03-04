import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { take, tap, map } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';
import { PeopleService } from '../people/people.service';

@Injectable({
  providedIn: 'root'
})
export class ResolverService implements Resolve<any>{

  constructor(private peopleserv: PeopleService,
              private router: Router) { }

  resolve(route: ActivatedRouteSnapshot){
    // const ID = route.url[0].path;
    const ID = route.paramMap.get('individual').split('-').join(' ');
    // return this.generalcollectserv.getMember(ID).pipe(
      return this.peopleserv.getPeople().pipe(
        take(1),
        map(people => people.find(person => person.name === ID)),
        tap(member => {
          if (member) {
            return of (member);
          } else {
            this.router.navigate(['Person Not Found']);
            return of (EMPTY);
          }
        })
      );
  }
}
