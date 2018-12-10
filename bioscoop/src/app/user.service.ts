import {Injectable} from '@angular/core';
import {User} from './model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User {
    let cu = localStorage.getItem('user');
    return cu ? JSON.parse(cu) : null;
  }
}
