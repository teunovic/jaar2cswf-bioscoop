import {Component, OnInit} from '@angular/core';
import {MoviesService} from '../../services/movies.service';
import {Router} from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-movies-create',
  templateUrl: './movies-create.component.html',
  styleUrls: ['./movies-create.component.css']
})
export class MoviesCreateComponent implements OnInit {

  error: string;

  title: string;
  description: string;
  releaseDate: string;
  minutes: number;

  constructor(private moviesService: MoviesService, private router: Router) { }

  ngOnInit() {
  }

  create() {
    if(!this.title || this.title.length < 2)
      this.error = 'Title must be at least two characters';
    else if(!this.description || this.description.length < 2)
      this.error = 'Description must be at least two characters';
    else if(!this.releaseDate || !moment(this.releaseDate).isValid())
      this.error = 'Please fill in a valid release date';
    else if(!this.minutes || this.minutes < 1 || this.minutes > 1024)
      this.error = 'Minutes must be between 1 and 1024';
    else {
      this.moviesService.create(this.title, this.description, moment(this.releaseDate).toDate(), this.minutes)
        .then(movie => {
          this.router.navigateByUrl('movies/' + movie.id);
        })
        .catch(e => {
          this.error = e.error.message;
          console.error(e);
        });
    }
  }

}
