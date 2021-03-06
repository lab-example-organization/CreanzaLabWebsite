import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot,
         RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

import {AuthService} from './auth.service';
import { User } from 'src/app/Classes/user';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService,
              private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    const url: string = state.url;
    return this.checkAdmin(url);
  }


  checkAdmin(url: string): Observable<boolean> {
    return this.auth.user.pipe(
      take(1),
      map((user: User) => {
        if (user) {
          const path: string = url.split('/')[2];
          if (path === 'edit') {
            if (user.roles[0]) { return true; }
          } else if (path === 'upload') {
            if (user.roles[1]) { return true; }
            // change this to 1 once all the backend is prepared
          } else {
            if (user.roles[2]) { return true; }
            // change this to 2 once all the backend is prepared
          }
        }
        this.auth.redirectUrl = url;
            this.router.navigate(['users']);
            return false;
      })
    );
  }

}
