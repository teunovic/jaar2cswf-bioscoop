import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UserService} from '../user.service';
import {Movie} from '../model/Movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private headers;

  constructor(private http: HttpClient, private userService: UserService) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.userService.getUser().token });
    console.log('token = ' + this.userService.getUser().token);
  }

  fetchAll(): Promise<Movie[]> {
    return new Promise<Movie[]>((resolve, reject) => {
      this.http.get<any>(environment.apiUrl + '/movies', {headers: this.headers})
        .toPromise()
        .then(results => resolve(results.map(movie => new Movie(movie._id, movie.title, movie.description, movie.releaseDate, movie.minutes))))
        .catch(e => reject(e));
    });
  }

  fetchById(id: string): Promise<Movie> {
    return new Promise<Movie>((resolve, reject) => {
      this.http.get<any>(environment.apiUrl + '/movies/' + id, {headers: this.headers})
        .toPromise()
        .then(result => resolve(new Movie(result._id, result.title, result.description, result.releaseDate, result.minutes)))
        .catch(e => reject(e));
    });
  }

  edit(id: string, title: string, description: string, releaseDate: string, minutes: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.put<any>(environment.apiUrl + '/movies/' + id, {
        title: title,
        description: description,
        releaseDate: releaseDate,
        minutes: minutes
      },{headers: this.headers})
        .toPromise()
        .then(() => {
          resolve();
        })
        .catch(e => reject(e));
    });
  }

  create(title: string, description: string, releaseDate: string, minutes: number): Promise<Movie> {
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(environment.apiUrl + '/movies', {
        title: title,
        description: description,
        releaseDate: releaseDate,
        minutes: minutes
      }, {headers: this.headers})
        .toPromise()
        .then(result => {
          resolve(new Movie(result._id, result.title, result.description, result.releaseDate, result.minutes));
        })
        .catch(e => reject(e));
    });
  }

  delete(id: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.delete<any>(environment.apiUrl + '/movies/' + id, {headers: this.headers})
        .toPromise()
        .then(() => resolve())
        .catch(e => reject(e));
    });
  }

}
