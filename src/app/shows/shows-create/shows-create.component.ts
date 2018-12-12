import {Show} from '../../model/Show';
import {ShowsService} from '../../services/shows.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Movie} from '../../model/Movie';
import {Room} from '../../model/Room';
import {MoviesService} from '../../services/movies.service';
import {RoomsService} from '../../services/rooms.service';
import * as moment from 'moment';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-shows-create',
  templateUrl: './shows-create.component.html',
  styleUrls: ['./shows-create.component.css']
})
export class ShowsCreateComponent implements OnInit {

  public movies$: Promise<Movie[]>;
  public rooms$: Promise<Room[]>;

  selectedMovies: Movie[];
  selectedRooms: Room[];

  startDateVal: Date;
  endDate: Date;

  error: string;

  constructor(private route: ActivatedRoute, private router: Router, private showsService: ShowsService, private moviesService: MoviesService, private roomsService: RoomsService) {
  }

  async ngOnInit() {
    this.movies$ = this.moviesService.fetchAll();
    this.rooms$ = this.roomsService.fetchAll();
    this.selectedMovies = [];
    this.selectedRooms = [];
  }

  onChangeMovie() {
    if(this.selectedMovies.length && this.startDateVal) {
      this.endDate = moment(this.startDateVal).add(this.selectedMovies[0].minutes, 'm').toDate();
    }
  }

  onChangeStartDate(val) {
    let chosenStart = moment(val.target.value);
    console.log(chosenStart);
    if (chosenStart.isValid()) {
      this.startDateVal = chosenStart.toDate();
      if(this.selectedMovies[0]) {
        let end = chosenStart.add(this.selectedMovies[0].minutes, 'm');
        this.endDate = end.toDate();
      }
    } else {
      this.startDateVal = null;
      this.endDate = null;
    }
  }

  create() {
    if (!this.selectedMovies.length) {
      this.error = 'No movie was selected';
      return;
    }
    if (!this.selectedRooms.length) {
      this.error = 'No room was selected';
      return;
    }
    if (!this.startDateVal) {
      this.error = 'Invalid start date';
      return;
    }
    this.showsService.create(this.selectedMovies[0].id, this.selectedRooms[0].id, this.startDateVal)
      .then(s => this.router.navigateByUrl('/shows/' + s.id))
      .catch(err => {
        console.error(err);
        this.error = err.error.message;
      });
  }
}
