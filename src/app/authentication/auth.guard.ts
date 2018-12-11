import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {UserService} from '../user.service';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router/src/router_state';

@Injectable()
export class NeedAuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return !!this.userService.getUser();
  }
}
