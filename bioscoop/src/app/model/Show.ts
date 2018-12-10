import {Room} from './Room';
import {Movie} from './Movie';

export class Show {
  constructor(public id: string, public room: Room, public movie: Movie, public start: Date, public end: Date) {}
}

