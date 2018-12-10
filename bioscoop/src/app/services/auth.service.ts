import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {User} from '../model/User';
import {UserService} from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private userService: UserService) {

  }

  login(username: string, password: string): Observable<User> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let body = { 'username': username, 'password': password};
    return this.http.post<any>
    (environment.apiUrl + '/login', body, {headers: headers})
      .pipe(
        map(result => {
          const user = new User(result._id, result.username, result.isAdmin, result.token);
          this.userService.setUser(user);
          return user;
        })
      )
  }

  register(username: string, password: string): Observable<User> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let body = { 'username': username, 'password': password};
    return this.http.post<any>
    (environment.apiUrl + '/register', body, {headers: headers})
      .pipe(
        map(result => {
          const user = new User(result._id, result.username, result.isAdmin, result.token);
          this.userService.setUser(user);
          return user;
        })
      )
  }

}
