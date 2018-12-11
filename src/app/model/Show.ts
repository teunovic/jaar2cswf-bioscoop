import {Room} from './Room';
import {Movie} from './Movie';
import * as moment from 'moment';


export class Show {
  public end: Date;
  constructor(public id: string, public movie: Movie, public room: Room, public start: Date) {
    this.end = moment(start).add(movie.minutes, 'm').toDate();
  }
}

