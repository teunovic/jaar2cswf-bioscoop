import {Component, OnInit} from '@angular/core';
import {MoviesService} from '../../services/movies.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-movies-create',
  templateUrl: './movies-create.component.html',
  styleUrls: ['./movies-create.component.css']
})
export class MoviesCreateComponent implements OnInit {

  responseError: string;

  title: string;
  description: string;
  releaseDate: string;
  minutes: number;

  constructor(private moviesService: MoviesService, private router: Router) { }

  ngOnInit() {
  }

  create() {
    this.moviesService.create(this.title, this.description, this.releaseDate, this.minutes)
      .then(movie => {
        console.log(movie);
        this.router.navigateByUrl('movies/' + movie.id);
      })
      .catch(e => {
        this.responseError = e.error.message;
        console.error(e);
      });
  }

}
