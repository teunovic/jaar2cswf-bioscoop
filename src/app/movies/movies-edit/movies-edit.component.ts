import {Component, OnInit} from '@angular/core';
import {Movie} from '../../model/Movie';
import {MoviesService} from '../../services/movies.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-movies-edit',
  templateUrl: './movies-edit.component.html',
  styleUrls: ['./movies-edit.component.css']
})
export class MoviesEditComponent implements OnInit {

  public movie: Movie;

  title: string;
  description: string;
  releaseDate: Date;
  releaseDateField: string;
  minutes: number;

  error: string;

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
              this.releaseDate = movie.releaseDate;
              this.releaseDateField = movie.releaseDate.toString();
              this.minutes = movie.minutes;
            })
            .catch(e => {
              console.error(e);
            });
        },
        err => console.error(err));
  }

  onChangeDate(val) {
    let m = moment(val.target.value);
    this.releaseDate = m.isValid() ? m.toDate() : null;
    console.log(this.releaseDate);
  }

  edit() {
    if(!this.title || this.title.length < 2)
      this.error = 'Title must be at least two characters';
    else if(!this.description || this.description.length < 2)
      this.error = 'Description must be at least two characters';
    else if(!this.releaseDate)
      this.error = 'Please fill in a valid release date';
    else if(!this.minutes || this.minutes < 1 || this.minutes > 1024)
      this.error = 'Minutes must be between 1 and 1024';
    else {
      this.moviesService.edit(this.movie.id, this.title, this.description, this.releaseDate, this.minutes)
        .then(() => {
          this.router.navigateByUrl('movies/' + this.movie.id);
        })
        .catch(e => {
          this.error = e.error.message;
          console.error(e);
        });
    }
  }

}
