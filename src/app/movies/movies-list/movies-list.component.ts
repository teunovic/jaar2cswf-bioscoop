import {Component, OnInit} from '@angular/core';
import {Movie} from '../../model/Movie';
import {MoviesService} from '../../services/movies.service';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

  private _movies: Movie[];
  public movies: Movie[];

  searchQuery: string;

  constructor(public userService: UserService, private moviesService: MoviesService) {
  }

  ngOnInit() {
    this.moviesService.fetchAll()
      .then(movies => {
        this._movies = movies;
        this.movies = movies;
      })
      .catch(err => {
        console.error(err);
      });
  }

  onChange(newValue) {
    if (!newValue) {
      this.movies = this._movies;
      return;
    }
    newValue = newValue.toLowerCase();
    this.movies = this._movies.filter(m => m.title.toLowerCase().includes(newValue));
  }


}
