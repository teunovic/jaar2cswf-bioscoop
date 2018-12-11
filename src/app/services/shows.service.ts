import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UserService} from '../user.service';
import {Show} from '../model/Show';
import {Movie} from '../model/Movie';
import {Room} from '../model/Room';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {

  private headers;

  constructor(private http: HttpClient, private userService: UserService) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.userService.getUser().token });
  }

  createShow(obj: any): Show {
    return new Show(obj._id, new Movie(obj.movie._id, obj.movie.title, obj.movie.description, obj.movie.releaseDate, obj.movie.minutes), new Room(obj.room._id, obj.room.name), obj.start);
  }

  fetchAll(): Promise<Show[]> {
    return new Promise<Show[]>((resolve, reject) => {
      this.http.get<any>(environment.apiUrl + '/shows', {headers: this.headers})
        .toPromise()
        .then(results => resolve(results.map(show => this.createShow(show))))
        .catch(e => reject(e));
    });
  }

  fetchById(id: string): Promise<Show> {
    return new Promise<Show>((resolve, reject) => {
      this.http.get<any>(environment.apiUrl + '/shows/' + id, {headers: this.headers})
        .toPromise()
        .then(result => resolve(this.createShow(result)))
        .catch(e => reject(e));
    });
  }

  edit(id: string, movieId: string, roomId: string, start: Date): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.put<any>(environment.apiUrl + '/shows/' + id, {
        movie: movieId,
        room: roomId,
        start: start
      },{headers: this.headers})
        .toPromise()
        .then(() => resolve())
        .catch(e => reject(e));
    });
  }

  create(movie: string, room: string, start: Date): Promise<Show> {
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(environment.apiUrl + '/shows', {
        movie: movie,
        room: room,
        start: start
      }, {headers: this.headers})
        .toPromise()
        .then(result => resolve(this.createShow(result)))
        .catch(e => reject(e));
    });
  }

  delete(id: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.delete<any>(environment.apiUrl + '/shows/' + id, {headers: this.headers})
        .toPromise()
        .then(() => resolve())
        .catch(e => reject(e));
    });
  }

}
