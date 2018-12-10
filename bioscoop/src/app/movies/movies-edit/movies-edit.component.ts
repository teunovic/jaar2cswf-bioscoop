import {Component, OnInit} from '@angular/core';
import {Movie} from '../../model/Movie';
import {MoviesService} from '../../services/movies.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-movies-edit',
  templateUrl: './movies-edit.component.html',
  styleUrls: ['./movies-edit.component.css']
})
export class MoviesEditComponent implements OnInit {

  public movie: Movie;

  title: string;
  description: string;
  releaseDate: string;
  minutes: number;

  responseError: string;

  constructor(private route: ActivatedRoute, private router: Router, private moviesService: MoviesService) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(next => {
          this.moviesService.fetchById(next.id)
            .then(movie => {
              this.movie = movie;
              this.title = movie.title;
              this.description = movie.description;
              this.releaseDate = movie.releaseDate.toString();
              this.minutes = movie.minutes;
            })
            .catch(e => {
              console.error(e);
            });
        },
        err => console.error(err));
  }

  edit() {
    this.moviesService.edit(this.movie.id, this.title, this.description, this.releaseDate, this.minutes)
      .then(() => {
        this.router.navigateByUrl('movies/' + this.movie.id);
      })
      .catch(e => {
        this.responseError = e.error.message;
        console.error(e);
      });
  }

}
