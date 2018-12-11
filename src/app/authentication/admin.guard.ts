import {CanActivate} from '@angular/router';
import {Injectable} from '@angular/core';
import {UserService} from '../user.service';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router/src/router_state';

@Injectable()
export class NeedAdminGuard implements CanActivate {

  constructor(private userService: UserService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.userService.getUser() && this.userService.getUser().isAdmin;
  }
}
