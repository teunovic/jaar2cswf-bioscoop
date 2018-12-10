import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UserService} from '../user.service';
import {Room} from '../model/Room';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  private headers;

  constructor(private http: HttpClient, private userService: UserService) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.userService.getUser().token });
    console.log('token = ' + this.userService.getUser().token);
  }

  fetchAll(): Promise<Room[]> {
    return new Promise<Room[]>((resolve, reject) => {
      this.http.get<any>(environment.apiUrl + '/rooms', {headers: this.headers})
        .toPromise()
        .then(results => {
          let rooms = [];
          for(let i = 0; i < results.length; i++) {
            rooms[i] = new Room(results[i]._id, results[i].name);
          }
          resolve(rooms);
        })
        .catch(e => reject(e));
    });
  }

  fetchById(id: string): Promise<Room> {
    return new Promise<Room>((resolve, reject) => {
      this.http.get<any>(environment.apiUrl + '/rooms/' + id, {headers: this.headers})
        .toPromise()
        .then(result => resolve(new Room(result._id, result.name)))
        .catch(e => reject(e));
    });
  }

  edit(id: string, name: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.put<any>(environment.apiUrl + '/rooms/' + id, {
        name: name
      },{headers: this.headers})
        .toPromise()
        .then(() => {
          resolve();
        })
        .catch(e => reject(e));
    });
  }

  create(name: string): Promise<Room> {
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(environment.apiUrl + '/rooms', {
        name: name
      }, {headers: this.headers})
        .toPromise()
        .then(result => resolve(new Room(result._id, result.name)))
        .catch(e => reject(e));
    });
  }

  delete(id: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.delete<any>(environment.apiUrl + '/rooms/' + id, {headers: this.headers})
        .toPromise()
        .then(() => resolve())
        .catch(e => reject(e));
    });
  }

}
