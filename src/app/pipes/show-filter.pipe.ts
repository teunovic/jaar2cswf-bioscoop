import { Pipe, PipeTransform } from '@angular/core';
import {Show} from '../model/Show';
import {Room} from '../model/Room';
import {Movie} from '../model/Movie';

@Pipe({
  name: 'showFilter'
})
export class ShowFilterPipe implements PipeTransform {

  transform(shows: any[], movies: Movie[], rooms: Room[]): Show[] {
    if(!shows || (!movies && !rooms))
      return shows;

    console.log(shows);

    console.log(movies);
    console.log(rooms);

    let n = shows;

    if(movies && movies.length) {
      n = n.filter(s => {
        for(let i = 0; i < movies.length; i++) {
          if(movies[i].id === s.movie.id)
            return true;
        }
        return false;
      });
    }
    if(rooms && rooms.length) {
      n = n.filter(s => {
        for(let i = 0; i < rooms.length; i++) {
          if(rooms[i].id === s.room.id)
            return true;
        }
        return false;
      });
    }
    return n;
  }

}
