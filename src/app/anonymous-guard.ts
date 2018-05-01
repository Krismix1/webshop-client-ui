import { AuthService } from './services/auth.service';
import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";

// Guard to not allow users to go to login page when already logged in
@Injectable()
export class AnonymousGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['home']);
      return false;
    } else {
      return true;
    }
  }
}
