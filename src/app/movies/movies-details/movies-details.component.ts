import {Component, OnInit} from '@angular/core';
import {Movie} from '../../model/Movie';
import {MoviesService} from '../../services/movies.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-movies-details',
  templateUrl: './movies-details.component.html',
  styleUrls: ['./movies-details.component.css']
})
export class MoviesDetailsComponent implements OnInit {

  public movie: Movie;

  constructor(public userService: UserService, private route: ActivatedRoute, private router: Router, private moviesService: MoviesService, public modals: NgbModal) { }

  ngOnInit() {
    this.route.params
      .subscribe(next => {
          this.moviesService.fetchById(next.id)
            .then(movie => {
              this.movie = movie;
            })
            .catch(e => console.error(e));
        },
        err => {
          console.error(err);
        });
  }

  delete() {
    this.moviesService.delete(this.movie.id)
      .then(() => {
        this.modals.dismissAll();
        this.router.navigateByUrl('/movies');
      })
  }

  openDeleteDialog(content) {
    this.modals.open(content).result.then((result) => {
      //console.log('yeet')
    }, (reason) => {
      //console.log(reason);
    });
  }

}
