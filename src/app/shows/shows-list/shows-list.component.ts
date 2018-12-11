import {Component, OnInit} from '@angular/core';
import {Show} from '../../model/Show';
import {ShowsService} from '../../services/shows.service';
import {Movie} from '../../model/Movie';
import {Room} from '../../model/Room';
import {MoviesService} from '../../services/movies.service';
import {RoomsService} from '../../services/rooms.service';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-shows-list',
  templateUrl: './shows-list.component.html',
  styleUrls: ['./shows-list.component.css']
})
export class ShowsListComponent implements OnInit {

  shows$: Promise<Show[]>;

  movies$: Promise<Movie[]>;
  rooms$: Promise<Room[]>;

  selectedMovies: Movie[];
  selectedRooms: Room[];

  constructor(public userService: UserService, private showsService: ShowsService, private moviesService: MoviesService, private roomsService: RoomsService) {
  }

  ngOnInit() {
    this.movies$ = this.moviesService.fetchAll();
    this.rooms$ = this.roomsService.fetchAll();
    this.shows$ = this.showsService.fetchAll();
  }

  onChooseMovies(movies) {
    // this.shows = this._shows.filter(s => s.movie.title.toLowerCase().includes(newValue) || s.room.name.toLowerCase().includes(newValue));
  }

  onChooseRooms(val) {

  }




}
