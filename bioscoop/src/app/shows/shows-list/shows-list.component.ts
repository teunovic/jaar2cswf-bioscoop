import {Component, OnInit} from '@angular/core';
import {Show} from '../../model/Show';
import {ShowsService} from '../../services/shows.service';

@Component({
  selector: 'app-shows-list',
  templateUrl: './shows-list.component.html',
  styleUrls: ['./shows-list.component.css']
})
export class ShowsListComponent implements OnInit {

  private _shows: Show[];
  public shows: Show[];

  searchQuery: string;

  constructor(private showsService: ShowsService) {
  }

  ngOnInit() {
    this.showsService.fetchAll()
      .then(shows => {
        console.log(shows);
        this._shows = shows;
        this.shows = shows;
      })
      .catch(err => {
        console.error(err);
      });
  }

  onChange(newValue) {
    console.log(newValue);
    if (!newValue) {
      this.shows = this._shows;
      return;
    }
    newValue = newValue.toLowerCase();
    this.shows = this._shows.filter(s => s.movie.title.toLowerCase().includes(newValue) || s.room.name.toLowerCase().includes(newValue));
  }


}
