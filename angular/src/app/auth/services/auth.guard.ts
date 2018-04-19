import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authSvc: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.handleAuthRequests();
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.handleAuthRequests();
  }

  private handleAuthRequests() {
    if (!this.authSvc.hasCredentials) {
      this.router.navigate(['/welcome']);
      return false;
    }
    return true;
  }
}
