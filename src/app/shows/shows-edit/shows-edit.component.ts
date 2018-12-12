import {Component, OnInit} from '@angular/core';
import {Show} from '../../model/Show';
import {ShowsService} from '../../services/shows.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Movie} from '../../model/Movie';
import {Room} from '../../model/Room';
import {MoviesService} from '../../services/movies.service';
import {RoomsService} from '../../services/rooms.service';
import * as moment from 'moment';

@Component({
  selector: 'app-shows-edit',
  templateUrl: './shows-edit.component.html',
  styleUrls: ['./shows-edit.component.css']
})
export class ShowsEditComponent implements OnInit {

  public show$: Promise<Show>;
  public movies$: Promise<Movie[]>;
  public rooms$: Promise<Room[]>;
  show: Show;

  selectedMovies: Movie[];
  selectedRooms: Room[];

  startDateField: string;
  startDateVal: Date;
  endDate: Date;

  error: string;

  constructor(private route: ActivatedRoute, private router: Router, private showsService: ShowsService, private moviesService: MoviesService, private roomsService: RoomsService) {
  }

  async ngOnInit() {
    let params = await<any> this.route.params;
    this.show$ = this.showsService.fetchById(params.getValue().id);
    this.movies$ = this.moviesService.fetchAll();
    this.rooms$ = this.roomsService.fetchAll();
    this.show$.then(s => {
      this.show = s;
      this.startDateVal = s.start;
      this.startDateField = s.start.toString();
      this.endDate = s.end;
      this.movies$.then(ms => this.selectedMovies = ms.filter(m => m.id === s.movie.id));
      this.rooms$.then(rs => this.selectedRooms = rs.filter(r => r.id === s.room.id));
    });
  }

  onChangeMovie() {
    if(this.selectedMovies.length && this.startDateVal) {
      this.endDate = moment(this.startDateVal).add(this.selectedMovies[0].minutes, 'm').toDate();
    }
  }

  onChangeStartDate(val) {
    let chosenStart = moment(val.target.value);
    if (chosenStart.isValid()) {
      this.startDateVal = chosenStart.toDate();
      let end = chosenStart.add(this.show.movie.minutes, 'm');
      this.endDate = end.toDate();
    } else {
      this.startDateVal = null;
      this.endDate = null;
    }
  }

  edit() {
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
    this.showsService.edit(this.show.id, this.selectedMovies[0].id, this.selectedRooms[0].id, this.startDateVal)
      .then(() => this.router.navigateByUrl('/shows/' + this.show.id))
      .catch(err => {
        console.error(err);
        this.error = err.error.message;
      });
  }

}
